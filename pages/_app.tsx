import "../styles/globals.scss";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { FirebaseContextProvider } from "../context/firebase";
import { getDesignTokens } from "../theme";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    defaultMatches: true,
  });
  const theme = useMemo(
    () => createTheme(getDesignTokens(prefersDarkMode ? "dark" : "light")),
    [prefersDarkMode]
  );
  return (
    <QueryClientProvider client={new QueryClient()}>
      <FirebaseContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </FirebaseContextProvider>
    </QueryClientProvider>
  );
}
