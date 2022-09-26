import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { logout } from "../config/firebaseFunctions";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading, navigate]);
  return (
    <header className="task-header">
      <span Style="cursor: pointer" onClick={() => navigate("/dashboard")}>
        Task Manager
      </span>
      <button
        onClick={() => navigate("/dashboard/profile")}
        Style="float:right"
        className="header-avatar"
      >
        <span
          className="header-avatar-img"
          style={{ backgroundImage: `url(${user?.photoURL})` }}
        ></span>
        <span className="header-avatar-name">
          {user?.displayName || "User"}
        </span>
      </button>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
