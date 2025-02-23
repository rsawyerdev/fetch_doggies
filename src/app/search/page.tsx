'use client';

import { useQuery } from '@tanstack/react-query';
import { axios } from '../api/axios';
import * as React from 'react';
import { QueryClient } from '@tanstack/react-query';

export default function Seach() {
  async function getDogBreeds() {
    const data = axios.get('/dogs/breeds');
    return data;
  }

  function useGetDogBreeds() {
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

  const { data } = useGetDogBreeds();
  return (
    <div className='grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div>
          <ul>
            {data?.data.map((dog: string, index: number) => (
              <li key={index}>{dog}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
