import React from "react";
import { Box, Button, Container } from "@mui/material";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Copyright } from "./components/copywrite";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import { useAuth } from "./contexts/auth";
import { Home } from "./pages/home";
import { SignOut } from "./pages/signout";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.initiated)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button variant="contained">Loading...</Button>
      </Box>
    );

  if (!auth.user)
    return <Navigate to="/signin" state={{ from: location }} replace />;

  return <Outlet />;
}

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/signout" element={<SignOut />} />
        </Route>
      </Routes>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default App;
