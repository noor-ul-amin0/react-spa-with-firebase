import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Profile = () => {
  const [user] = useAuthState(auth);
  return (
    user && (
      <div
        style={{
          background: "black",
          color: "red",
          width: "400px",
          height: "400px",
        }}
      >
        {"{"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;email : {user?.email}
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;displayName : {user?.displayName}
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;phoneNumber : {user?.phoneNumber}
        <br />
        <br />
        {"}"}
      </div>
    )
  );
};

export default Profile;
