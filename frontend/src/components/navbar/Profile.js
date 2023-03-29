import React from "react";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="mt-10 text-center text-lg">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <div className="my-5">
        <p>Username</p>
        <p className="font-semibold">{user.username}</p>
      </div>
      <div>
        <p>Email</p>
        <p className="font-semibold">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
