import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import OrganiserLayout from "../components/Organiser-Dashboard/OrganiserLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const organiserPaths = [
    "/organiser-dashboard",
    "/create-event",
    "/edit-event",
    "/event-details",
    "/event-tickets",
    "/event-attendees",
    "/event-revenue",
    "/event-settings",
  ];
  const router = useRouter();

  const getLayout = () => {
    if (organiserPaths.includes(router.pathname)) {
      return (
        <OrganiserLayout {...pageProps}>
          <Component />
        </OrganiserLayout>
      );
    }

    return (
      <Layout {...pageProps}>
        <Component />
      </Layout>
    );
  };

  return (
    <>
      <Script id="maze">
						{`
            (function (m, a, z, e) {
              var s, t;
              try {
                t = m.sessionStorage.getItem('maze-us');
              } catch (err) {}

              if (!t) {
                t = new Date().getTime();
                try {
                  m.sessionStorage.setItem('maze-us', t);
                } catch (err) {}
              }

              s = a.createElement('script');
              s.src = z + '?t=' + t + '&apiKey=' + e;
              s.async = true;
              a.getElementsByTagName('head')[0].appendChild(s);
              m.mazeUniversalSnippetApiKey = e;
            })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', 'e33497a4-febc-436b-9955-745c0211e5c2');
            `}
					</Script>
      <Head>
        <title>Fanatix</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      
      {getLayout()}
    </>
  );
}
export default MyApp;
