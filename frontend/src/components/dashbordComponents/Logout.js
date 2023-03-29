import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  //Delete token and sessionstorage user and navigate back to the login page.
  const deleteToken = () => {
    window.location.reload();
    cookies.remove("Token");
    sessionStorage.removeItem("user");
    navigate("/");
  };
  return (
    <button
      onClick={deleteToken}
      className="block px-4 py-2 text-sm text-gray-700"
    >
      Logout
    </button>
  );
};

export default Logout;
