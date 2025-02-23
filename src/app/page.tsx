'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './login/page';
import Seach from './search/page';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Login />
      <Seach />
    </QueryClientProvider>
  );
}
