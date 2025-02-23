'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axios } from '../api/axios';
import * as React from 'react';
import Seach from '../search/page';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (loginDetails) => {
      return axios.post('/auth/login', loginDetails);
    },
  });

  return (
    <div className='grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <form>
          <input placeholder='name' />
          <input placeholder='email' />
          <button
            type='button'
            onClick={() =>
              mutation.mutate(
                { email: 'email@h.com', name: 'rose' },
                {
                  onSuccess(data) {
                    router.push('/search');
                  },
                  onError(error) {
                    console.log('errr', error);
                  },
                }
              )
            }
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
