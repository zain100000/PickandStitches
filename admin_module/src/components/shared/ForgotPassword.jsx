import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../FirebaseConfig/FirebaseConfig";
import { TailSpin } from "react-loader-spinner";
import "./css/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailError = validateEmail();
    if (emailError) {
      toast.error(emailError);
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.");
      navigate("/auth/signin");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      toast.error(
        "Error sending password reset email. Please check your email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="forgot-password-form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-6">
            <div className="forgot-password-wrap p-4 p-md-5">
              <h3 className="mb-4">Reset Password</h3>
              <form
                onSubmit={handleResetPassword}
                className="forgot-password-form"
              >
                <div className="form-group mb-3">
                  <label className="label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loader-container">
                        <TailSpin height={20} width={20} color="#fff" />
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </div>
              </form>
              <p className="text-center">
                Remembered your password? <Link to="/auth/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
