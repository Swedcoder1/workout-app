import React, { useState } from "react";
import Logout from "../dashbordComponents/Logout";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import NavbarUser from "./NavbarUser";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Navbar = ({ user }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const token = cookies.get("Token");

  const openProfileModule = () => {
    setOpenProfile(!openProfile);
  };

  //Find user

  return (
    <nav className="bg-gray-800">
      {token && (
        <NavbarUser
          user={user}
          openProfile={openProfile}
          openProfileModule={openProfileModule}
        />
      )}
    </nav>
  );
};

export default Navbar;
