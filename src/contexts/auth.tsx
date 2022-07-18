import * as React from "react";
import firebase from "firebase/auth";
import { auth } from "../firebase";

type User = firebase.User | null;
type ContextState = {
  initiated: boolean;
  user: User;
};

export const AuthContext = React.createContext<ContextState | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(null);
  const [initiated, setInitiated] = React.useState<boolean>(false);
  const value = { user, initiated };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setInitiated(true);
      setUser(user);
    });
    return () => {
      setInitiated(false);
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider");
  }
  return context;
}
