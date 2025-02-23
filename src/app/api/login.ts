import { axios } from './axios';
import { useMutation } from '@tanstack/react-query';

async function login(name: any, email: any) {
  const { data } = await axios.post('/auth/login', name, email);
  return data;
}

export function useLogin() {
  const mutation = useMutation({ mutationFn: login });

  return mutation;
}
