import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { BsFillPersonFill } from "react-icons/bs";

const Navbar = () => {
  AOS.init();

  const LogoutHandle = () => {
    signoutSuccess();
  };

  const signoutSuccess = () => {
    Swal.fire({
      text: "Anda ingin Logout?",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "light",
      confirmButtonText: "Iya!",
      cancelButtonText: "Tidak!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "warning",
          text: "Anda telah Logout!",
        }).then(() => {
          window.location.reload(false)
        });
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("authToken");
        localStorage.removeItem("orderId");
      }
    });
  };

  const user = localStorage.getItem("authToken");

  if (user) {
    const userLogin = localStorage
      .getItem("userName")
      .toLocaleUpperCase()
      .replace(/["]/g, "");

    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-light shadow-sm"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <div className="container-fluid m-1">
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                alt=""
                className="rounded rounded-pill border"
                height={46}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/" className="nav-item nav-link fw-bold">
                  Beranda
                </Link>
                <Link to="/rute" className="nav-item nav-link fw-bold">
                  Rute Travel
                </Link>
                <Link to="/reservasi" className="nav-item nav-link fw-bold">
                  Reservasi
                </Link>
                <Link to="/history" className="nav-item nav-link fw-bold">
                  Riwayat Reservasi
                </Link>
                <button
                  className="non-hide nav-item nav-link bg-transparent border rounded rounded-pill"
                  onClick={() => LogoutHandle()}
                >
                  <small className="fw-bold">Logout</small>
                </button>
              </ul>
            </div>
            <div className="navbar-nav responsive-hide">
              <button
                className="nav-link bg-transparent border rounded rounded-pill"
                onClick={() => LogoutHandle()}
              >
                <BsFillPersonFill className="me-2" />
                <small className="fw-bold">{userLogin}</small>
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-light shadow-sm"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <div className="container-fluid m-1">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="" height={46} className="rounded rounded-pill border" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/" className="nav-item nav-link fw-bold">
                  Beranda
                </Link>
                <Link to="/rute" className="nav-item nav-link fw-bold">
                  Rute Travel 
                </Link>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-bold"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Akun
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      Register
                    </Link>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
