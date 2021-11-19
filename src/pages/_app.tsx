import type { AppProps } from "next/app";
import StoreProvider from "utils/Store";
import "../assets/styles/global.css";
import "../assets/styles/scss/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
