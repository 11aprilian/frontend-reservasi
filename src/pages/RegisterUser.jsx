import React, { useEffect, useState } from "react";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import banner from "../assets/banner.svg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { validate, res } from "react-email-validator";

const RegisterUser = () => {
  AOS.init();
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const setUser = async () => {
    if (email === "" || username === "" || password === "") {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else if (username.length < 4 || password.length < 6) {
      Swal.fire({
        icon: "error",
        text: "Username minimal 4 kata dan Password minimal 6 kata!",
      });
    } else if (confirmPassword !== password) {
      Swal.fire({
        icon: "error",
        text: "Mohon konfirmasi Password anda dengan benar!",
      });
    } else {
      validate(email);
      if (res) {
        Swal.fire({
          text: "Selamat anda berhasil Registrasi, Silahkan Login!",
          icon: "success",
        });

        let regis = {
          email: email,
          username: username,
          password: password,
        };
        console.log(regis);

        try {
          const user = await Axios.post(
            "http://localhost:3050/user/register",
            regis,
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          console.log(user.data);
          navigate("/login");
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: "Username atau Email sudah digunakan!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Masukkan Email dengan Benar!",
        });
      }
    }
  };

  return (
    <>
      <section className="m-4">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      data-aos="fade-right"
                      data-aos-duration="800"
                    >
                      <a href="/">
                        <img src={logo} alt="" width={250} />
                      </a>

                      <form className="mx-1 mx-md-4 mt-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex form-outline flex-fill mb-0">
                            <MdAttachEmail className="m-auto me-2" />
                            <input
                              change="text"
                              name="email"
                              className="form-control"
                              placeholder="Masukkan Email"
                              required
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex form-outline flex-fill mb-0">
                            <BsFillPersonFill className="m-auto me-2" />
                            <input
                              change="text"
                              name="username"
                              className="form-control"
                              placeholder="Masukkan Username"
                              required
                              onChange={(e) => setUserame(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex form-outline flex-fill mb-0">
                            <BsFillLockFill className="m-auto me-2" />
                            <input
                              type="password"
                              name="password"
                              id="password-input"
                              className="form-control"
                              placeholder="Masukkan Password"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex form-outline flex-fill mb-0">
                            <BsFillLockFill className="m-auto me-2" />
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Konfirmasi Password"
                              required
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-danger btn-lg shadow"
                            onClick={(e) => setUser(e.preventDefault())}
                          >
                            Daftar
                          </button>
                        </div>
                        <p className="text-center">
                          Sudah punya akun? Silahkan{" "}
                          <Link
                            to="/login"
                            className="text-decoration-none text-danger"
                          >
                            Login
                          </Link>
                        </p>
                      </form>
                    </div>
                    <div
                      className="col-md-10 mt-5 col-lg-6 col-xl-5 order-2 order-lg-1 responsive-hide"
                      data-aos="fade-left"
                      data-aos-duration="800"
                    >
                      <img src={banner} alt="" width={450} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterUser;
