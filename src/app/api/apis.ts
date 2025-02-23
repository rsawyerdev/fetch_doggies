import Axios from 'axios';
import axiosRetry from 'axios-retry';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';

export const axios = Axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

export const axiosWithRetry = Axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});
axiosRetry(axiosWithRetry, { retries: 1000 });

axios.interceptors.request.use(function (config) {
  return config;
});

axiosWithRetry.interceptors.request.use(function (config) {
  return config;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(JSON.stringify(error.response.data, null, 2));
      // console.log(JSON.stringify(error.response.status, null, 2));
      // console.log(JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(JSON.stringify(error.request, null, 2));
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
    }
    // console.log(JSON.stringify(error.config, null, 2));
    return Promise.reject(error);
  }
);

async function login(name: any, email: any) {
  const { data } = await axios.post('/auth/login', name, email);
  return data;
}

export function useLogin() {
  const mutation = useMutation({ mutationFn: login });

  return mutation;
}

async function getDogBreeds() {
  const data = axios.get('/dogs/breeds');
  return data;
}

export function useGetDogBreeds() {
  const queryClient = new QueryClient();
  const query = useQuery(
    {
      queryKey: ['breeds'],
      queryFn: async () => getDogBreeds(),
      staleTime: 60000,
    },
    queryClient
  );

  return query;
}
