import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap" rel="stylesheet" />
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
