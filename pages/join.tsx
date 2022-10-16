import {
  getAuth,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
} from "firebase/auth";
import { useFormik } from "formik";
// import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Divider,
  Box,
  SwipeableDrawer,
  TextField,
  Grid,
  Button,
  Typography,
  Avatar,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import Link from "../component/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form() {
  const [timestamp] = useState(Date.now().toString());
  const auth = getAuth();
  const formik = useFormik<{ email: string }>({
    initialValues: {
      email: `ayoub+chestr${timestamp}@oudmane.me`,
    },
    // validationSchema: yup.object({
    //   email: yup
    //     .string()
    //     .email("Enter a valid email")
    //     .required("Email is required"),
    // }),
    onSubmit: (values, formikHelpers) =>
      sendSignInLinkToEmail(auth, values.email, {
        handleCodeInApp: true,
        url: location.href,
      })
        .then(() => {
          window.localStorage.setItem("emailForSignIn", values.email);
          formikHelpers.setStatus("sent");
        })
        .catch((error) => formikHelpers.setErrors({ email: error.message })),
  });
  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      container
      spacing={3}
      columns={1}
    >
      {formik.status && (
        <>
          <Grid item xs={1}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar sx={{ m: 1, display: "inline-flex" }}>
                <EmailOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Check your email
              </Typography>
              <Typography>
                We emailed a magic link to
                <br />
                <Button variant="text" sx={{ textTransform: "inherit" }}>
                  {formik.values.email}
                </Button>
                <br />
                Click the link to continue.
              </Typography>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => formik.setStatus(undefined)}
              >
                Back
              </Button>
            </Box>
          </Grid>
        </>
      )}
      {!formik.status && (
        <>
          <Grid item xs={1}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={1}>
            <Box>
              <Footer />
            </Box>
          </Grid>
          <Grid item xs={1}>
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              fullWidth
              color="primary"
              variant="contained"
            >
              Continue
            </LoadingButton>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export function Footer() {
  return (
    <Typography color="gray">
      By continuing, you agree to the{" "}
      <Link color="#808080" href="/terms">
        Terms and Conditions
      </Link>{" "}
      and{" "}
      <Link color="#808080" href="/privacy">
        Privacy Policy
      </Link>
      .
    </Typography>
  );
}
export default function SignUp() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(!false);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email!, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          router.push("/home");
        })
        .catch(console.error);
    }
  }, [auth, router]);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "space-around",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>
          </Grid>
          <Grid item>
            <Divider>or</Divider>
          </Grid>
          <Grid item>
            <Button
              // type="submit"
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<EmailOutlinedIcon />}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              Continue with Email
            </Button>
          </Grid>
        </Grid>
        <Box>
          <Footer />
        </Box>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        onOpen={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <Box sx={{ p: 3, py: 10 }}>
          <Form />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
