import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function SignOut() {
  const navigation = useNavigate();
  React.useEffect(() => {
    signOut(auth).then(() => {
      navigation("/");
    });
  }, [navigation]);
  return <h2>Signing out...</h2>;
}
