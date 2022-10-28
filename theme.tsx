import { ThemeOptions, PaletteMode } from "@mui/material";
import Link from "next/link";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  const palette = {
    mode,
    // muted: "grey",
    // primary: {
    //   main: "#E0007F",
    //   light: "#FFC2E4",
    // },
    // secondary: {
    //   main: "#19857b",
    // },
    // error: {
    //   main: red.A400,
    // },
  };
  return {
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRadius: '20px 20px 0 0'
          }
        }
      }
    },
    palette,
  } as ThemeOptions;
};
