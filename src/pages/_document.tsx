import { Head, Html, Main, NextScript } from "next/document";

/**
 * The project had no custom _document, so every page shipped `<html>` with no
 * `lang` attribute — screen readers had to guess the language, and it's a
 * WCAG 3.1.1 failure on every route.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
