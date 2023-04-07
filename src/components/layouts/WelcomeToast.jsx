import React from "react";
import { Link } from "react-router-dom";

const WelcomeToast = () => {
  const user = localStorage.getItem("userName").replace(/["]/g, "");
  const hide = () => {
    document.getElementById("toast").style.display = "none";
  };

  return (
    <div className="responsive-hide" id="toast">
      <div className="welcome card" data-aos="fade-left" data-aos-delay="1200">
        <div className="card-header d-flex justify-content-between">
          <small className="fw-bold text-capitalize text-dark">
            LajuJaya Tour & Travel!
          </small>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hide}
          ></button>
        </div>
        <div className="card-body">
          <Link to="/rute" className="text-decoration-none text-dark small">Kamu mau travel kemana?</Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeToast;
