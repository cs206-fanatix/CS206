import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import Head from 'next/head';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>Fanatix</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
export default MyApp
