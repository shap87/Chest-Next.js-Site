// libs
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

// components
import { FirebaseContextProvider } from "../context/firebase";

// assets
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FirebaseContextProvider>
        <Component {...pageProps} />
      </FirebaseContextProvider>
    </QueryClientProvider>
  );
}
