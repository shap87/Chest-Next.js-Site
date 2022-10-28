import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AttributionSetup() {
  const auth = getAuth();
  const router = useRouter();
  useEffect(() => {
    router.push("/" + auth.currentUser?.uid);
  }, []);
  return <></>;
}
