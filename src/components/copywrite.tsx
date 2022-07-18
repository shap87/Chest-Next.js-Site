import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Chestr
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
