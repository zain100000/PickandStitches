import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore, auth } from "../../../FirebaseConfig/FirebaseConfig";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TailSpin } from "react-loader-spinner";
import "./css/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateUsername = () => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!username || !regex.test(username)) {
      return "Username is required and should contain only alphabets";
    }
    return "";
  };

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
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long with uppercase, lowercase, number, and special character";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const usernameError = validateUsername();
    const emailError = validateEmail();
    const passwordError = validatePassword();

    if (usernameError) {
      toast.error(usernameError);
      setLoading(false);
      return;
    }
    if (emailError) {
      toast.error(emailError);
      setLoading(false);
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(firestore, "admins"), {
        username,
        email,
      });
      toast.success("Registration Successful");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/auth/signin");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="signup-form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-6">
            <div className="login-wrap p-4 p-md-5">
              <div className="d-flex">
                <div className="w-100">
                  <h3 className="mb-4">Sign Up</h3>
                </div>
              </div>
              <form onSubmit={handleRegister} className="signup-form">
                <div className="form-group mb-3">
                  <label className="label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="label">Email</label>
                  <input
                    type="email"
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
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
              <p className="text-center">
                Already have an account? <Link to="/auth/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
