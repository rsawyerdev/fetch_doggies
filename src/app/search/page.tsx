'use client';

import { useGetDogBreeds } from '../api/apis';
import * as React from 'react';

export default function Seach() {
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
