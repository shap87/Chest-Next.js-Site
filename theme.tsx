// import { forwardRef } from "react";
import { ThemeOptions, PaletteMode } from "@mui/material";
// import NextLink, { LinkProps as NextLinkProps } from "next/link";
// import { styled } from "@mui/material/styles";

// const Anchor = styled("a")({});

// interface NextLinkComposedProps
//   extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
//     Omit<
//       NextLinkProps,
//       "href" | "as" | "onClick" | "onMouseEnter" | "onTouchStart"
//     > {
//   to: NextLinkProps["href"];
//   linkAs?: NextLinkProps["as"];
// }

// export const NextLinkComposed = forwardRef<any, NextLinkComposedProps>(
//   function NextLinkComposed(props, ref) {
//     const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } =
//       props;

//     return (
//       <NextLink
//         href={to}
//         prefetch={prefetch}
//         as={linkAs}
//         replace={replace}
//         scroll={scroll}
//         shallow={shallow}
//         passHref
//         locale={locale}
//       >
//         <Anchor ref={ref} {...other} />
//       </NextLink>
//     );
//   }
// );

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
      MuiLink: {
        // defaultProps: {
        //   component: NextLinkComposed,
        // },
        // styleOverrides: {
        //   root: {
        //     textDecoration: "none",
        //   },
        // },
      },
      // MuiButtonBase: {
      //   defaultProps: {
      //     LinkComponent: NextLinkComposed,
      //   },
      // },
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: "transparent",
      //       color: 'black',
      //       boxShadow: 'none',
      //       border: 'solid 1px #D0D5DD',
      //       // borderWidth: '1px'
      //     },
      //   },
      // },
      // MuiAvatar: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: palette.primary.light,
      //     },
      //   },
      // },
      // MuiSvgIcon: {
      //   defaultProps: {
      //     color: "primary",
      //   },
      // },
    },
    palette,
  } as ThemeOptions;
};
