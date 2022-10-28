import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Setup() {
  const router = useRouter();
  useEffect(() => {router.push("/setup/name")}, []);
  return <></>;
}
