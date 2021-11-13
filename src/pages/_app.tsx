import type { AppProps } from "next/app";
import "../assets/styles/global.css";
import "../assets/styles/scss/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
