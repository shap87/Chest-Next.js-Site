import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { PropsWithChildren, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useProfile } from "../context/profile";

export default function NewFolderSwipeableDrawer(
  props: PropsWithChildren<{
    onSuccess?: () => void;
  }>
) {
  const profile = useProfile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      visibility: false,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
    }),
    onSubmit: ({ name, visibility }, formikHelpers) =>
      profile
        .addFolder({ name, visibility: Number(visibility) })
        .then(() => setIsDrawerOpen(!isDrawerOpen))
        .then(() => props.onSuccess && props.onSuccess()),
  });
  useEffect(() => {
    if (isDrawerOpen) formik.resetForm();
  }, [isDrawerOpen]);
  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        onOpen={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <Box sx={{ p: 3 }}>
          <Grid
            component="form"
            onSubmit={formik.handleSubmit}
            container
            spacing={3}
            columns={1}
          >
            <Grid item xs={1}>
              <Typography variant="h6">New Folder</Typography>
              <Typography>
                What do you want to call your new folder ?
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                required
                fullWidth
                label="Name"
                placeholder="Enter folder name"
                name="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="visibility"
                    checked={formik.values.visibility}
                    onChange={formik.handleChange}
                  />
                }
                label="Private"
              />
            </Grid>
            <Grid item xs={1}>
              <Grid container spacing={2} columns={2}>
                <Grid item xs={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>
      <Box onClick={() => setIsDrawerOpen(!isDrawerOpen)}>{props.children}</Box>
    </>
  );
}
