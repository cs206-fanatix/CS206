import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import OrganiserLayout from '../components/Organiser-Dashboard/OrganiserLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';


function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  const organiserPaths = [
    '/organiser-dashboard', 
    '/create-event', 
    '/edit-event', 
    '/event-details', 
    '/event-tickets', 
    '/event-attendees', 
    '/event-revenue', 
    '/event-settings']
  const router = useRouter();

  const getLayout = () => {
    if (organiserPaths.includes(router.pathname)) {
      return <OrganiserLayout {... pageProps}>{Component}</OrganiserLayout>;
    }

    return <Layout {... pageProps}>{Component}</Layout>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Fanatix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {getLayout()}
    </QueryClientProvider>
  );
}
export default MyApp
