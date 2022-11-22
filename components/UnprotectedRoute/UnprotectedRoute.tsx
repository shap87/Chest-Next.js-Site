import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useFirebase } from "../../context/firebase";
import { routes } from "../../utils/routes";

const UnprotectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const app = useFirebase();

  const user = getAuth(app).currentUser;

  useEffect(() => {
    if (user) {
      router.push(routes.profile);
    }
  }, [user]);

  return <>{children}</>;
};

export default UnprotectedRoute;
