import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/global.css";
import { bodyFont, displayFont } from "../utils/fonts";
import StoreProvider from "../utils/Store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} font-sans`}>
      <StoreProvider>
        <Component {...pageProps} />

        {/* Single toast host for the whole app. Basket, review and form
            feedback route through this instead of window.alert() and a
            second <ToastContainer> mounted inside the contact page. */}
        <ToastContainer
          position="bottom-right"
          autoClose={3200}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          theme="light"
        />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
