'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogin } from '../api/apis';

export default function Login() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const router = useRouter();

  const loginMutation = useLogin();

  return (
    <div className='grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <form>
          <input
            placeholder='name'
            onChange={(name) => setName(name.target.value)}
          />
          <input
            placeholder='email'
            onChange={(email) => setEmail(email.target.value)}
          />
          <button
            type='button'
            onClick={() =>
              loginMutation.mutate(
                { email: email, name: name },
                {
                  onSuccess(data) {
                    router.push('/search', data);
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
