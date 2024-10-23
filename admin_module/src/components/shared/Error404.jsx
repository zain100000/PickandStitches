import React from "react";
import { Link } from "react-router-dom";
import "./css/Error404.css";

const Error404 = () => {
  return (
    <section id="error-404">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-6">
            <div className="notfound-wrap p-4 p-md-5 text-center">
              <div className="not-found-illustration mt-4">
                <img
                  src="https://img.freepik.com/free-vector/404-error-with-people-holding-numbers-concept-illustration_114360-7913.jpg?t=st=1729521327~exp=1729524927~hmac=4e5e8a47e5215f276a83ef1338179282023afa775863ab8aa991944e8214da23&w=740"
                  alt="404 Illustration"
                  className="img-fluid"
                />
              </div>
              <h3 className="mb-4">Oops! Page not found.</h3>
              <p className="not-found-description">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link
                to="/auth/signin"
                className="btn btn-primary not-found-button"
              >
                Go to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
