import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <img src={user?.picture} alt={user?.name} className="rounded-full" />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        {/* <p className="break-all">{JSON.stringify(user)}</p> */}
      </div>
    )
  );
};

export default Profile;
