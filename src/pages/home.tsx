import { Link } from "@mui/material";
import { useAuth } from "../contexts/auth";

export function Home() {
  const auth = useAuth();
  return (
    <div>
      <h2>Hello world</h2>
      <Link href="/signout">Sign out</Link>
      <pre>{JSON.stringify(auth.user, null, 2)}</pre>
    </div>
  );
}
