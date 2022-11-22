import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthStateReady, FirebaseContextProvider } from "../context/firebase";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import UnprotectedRoute from "../components/UnprotectedRoute/UnprotectedRoute";

import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noAuthRequired = useMemo(() => ["", "/", "/login"], []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <FirebaseContextProvider>
        <AuthStateReady>
          {noAuthRequired.includes(router.pathname) ? (
            <UnprotectedRoute>
              <Component {...pageProps} />
            </UnprotectedRoute>
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </AuthStateReady>
      </FirebaseContextProvider>
    </QueryClientProvider>
  );
}
