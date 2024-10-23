import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseConfig/FirebaseConfig";
import { TailSpin } from "react-loader-spinner";
import "./css/Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const validatePassword = () => {
    if (!password) {
      return "Password is required";
    }
    return "";
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailError = validateEmail();
    if (emailError) {
      toast.error(emailError);
      setLoading(false);
      return;
    }

    const passwordError = validatePassword();
    if (passwordError) {
      toast.error(passwordError);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      toast.success("Sign in successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in: ", error);
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Error during sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="signin-form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-6">
            <div className="login-wrap p-4 p-md-5">
              <h3 className="mb-4">Sign In</h3>
              <form onSubmit={handleSignIn} className="signin-form">
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
                <div className="form-group mb-3">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="w-50 text-md-left">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div>
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
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>
              <p className="text-center">
                Didn't have an account? <Link to="/auth/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
