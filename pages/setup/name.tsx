import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import Head from "next/head";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { getAuth, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { FirebaseReady } from "../../context/firebase";

export function NameSetupComponent() {
  const { currentUser } = getAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      displayName: "",
      //   firstName: "",
      //   lastName: "",
    },
    validationSchema: yup.object({
      displayName: yup.string().required("Name is required"),
    }),
    onSubmit: (values, formikHelpers) =>
      updateProfile(currentUser!, {
        displayName: values.displayName,
      }).then(
        () => router.push('/setup/attribution')
      ),
  });
  return (
    <>
      <Head>
        <title>Almost there</title>
      </Head>
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
          component="form"
          onSubmit={formik.handleSubmit}
          container
          spacing={3}
          columns={1}
        >
          <Grid item xs={1}>
            <Box>
              <Avatar sx={{ m: 1, display: "inline-flex" }}>
                <SentimentSatisfiedAltOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Almost there!
              </Typography>
              <Typography>What should we call you?</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <TextField
              required
              fullWidth
              id="displayName"
              label="Name"
              placeholder="Enter your Name"
              name="displayName"
              autoComplete="name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              error={
                formik.touched.displayName && Boolean(formik.errors.displayName)
              }
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
            />
          </Grid>
          {/* <Grid item xs={1}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              placeholder="Enter your First Name"
              name="firstName"
              autoComplete="given-name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              placeholder="Enter your Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid> */}
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
        </Grid>
      </Box>
    </>
  );
}


export default function NameSetup() {
  return (
    <>
      <Head>
        <title>Join Chestr</title>
      </Head>
      <FirebaseReady>
        <NameSetupComponent />
      </FirebaseReady>
    </>
  );
}