import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useOutlet } from "react-router-dom";
import { auth } from "./config/firebase";
import Header from "./components/Header";
const ProtectedLayout = () => {
  const [user] = useAuthState(auth);
  const outlet = useOutlet();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header />
      {outlet}
    </>
  );
};
export default ProtectedLayout;
