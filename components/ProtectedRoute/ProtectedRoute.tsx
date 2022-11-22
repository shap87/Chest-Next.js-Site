import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useFirebase } from "../../context/firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const app = useFirebase();
    const user = getAuth(app).currentUser;

    useEffect(() => {
        console.log(user);
    }, [user])

    return <>{children}</>
}

export default ProtectedRoute;