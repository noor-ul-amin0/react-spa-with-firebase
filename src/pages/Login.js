import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { useStore } from "../config/zustandStore";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../config/firebaseFunctions";

function Login() {
  const { startLoading, stopLoading } = useStore((state) => state);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  if (error) {
    toast.error(error.message);
  }
  useEffect(() => {
    if (loading) {
      startLoading();
      return;
    }
    stopLoading();
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button onClick={signInWithGoogle} className="loginBtn loginBtn--google">
        Login with Google
      </button>
    </form>
  );
}
export default Login;
