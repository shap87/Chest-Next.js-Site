import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFirebase } from "../../../context/firebase";
import { routes } from "../../../utils/routes";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const app = useFirebase();

  const user = getAuth(app).currentUser;

  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    }
  }, [user]);

  return <>{children}</>;
};
