/*global chrome*/
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import {wrapper} from '../store/store';

import {AuthStateReady, FirebaseContextProvider} from '../context/firebase';

import {ProtectedRoute, UnprotectedRoute} from '../components/routes';

import '../styles/globals.scss';

function App({Component, ...rest}: AppProps) {
  const router = useRouter();
  const {store, props} = wrapper.useWrappedStore(rest);

  console.log(router.pathname);

  const noAuthRequired = useMemo(() => ['', '/', '/login', '/sign-up'], []);

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
      <Provider store={store}>
        <FirebaseContextProvider>
          <AuthStateReady>
            {noAuthRequired.includes(router.pathname) ? (
              <UnprotectedRoute>
                <Component {...props} />
              </UnprotectedRoute>
            ) : (
              <ProtectedRoute>
                <Component {...props} />
              </ProtectedRoute>
            )}
          </AuthStateReady>
        </FirebaseContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
