import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../FirebaseConfig/FirebaseConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.png";
import "./css/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout successful!");
      navigate("/auth/signin");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <header id="header">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="col-auto text-end">
            <div className="logout" onClick={handleLogout}>
              Logout
              <i className="fas fa-sign-out-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
