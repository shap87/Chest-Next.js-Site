/*global chrome*/
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthStateReady, FirebaseContextProvider } from "../context/firebase";

import { ProtectedRoute, UnprotectedRoute } from "../components/routes";

import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  console.log(router.pathname);

  const noAuthRequired = useMemo(() => ["", "/", "/login", "/sign-up"], []);

  /* Google extension detection */
  // useEffect(() => {
  //   chrome.runtime.sendMessage(
  //     "aknpjjjjbhhpbdeboefcnnbafldhckej",
  //     "version",
  //     (response: any) => {
  //       if (!response) {
  //         console.log("No extension");
  //         return;
  //       }
  //       console.log("Extension version: ", response.version);
  //     }
  //   );
  // }, []);

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
              <div id="edit-profile-dialog"></div>
            </ProtectedRoute>
          )}
        </AuthStateReady>
      </FirebaseContextProvider>
    </QueryClientProvider>
  );
}
