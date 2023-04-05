import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  AOS.init();
  return (
    <div className="hero-image container-fluid">
      <div
        className="p-5 text-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="mask mt-5">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mt-5 text-uppercase fw-bolder">
                Laju Jaya Tour & Travel
              </h1>
              <p className="small">
                Segera daftarkan akun anda pada website Reservasi LajuJaya Tour
                & Travel
                <br />
                Dan permudah rencana perjalanan anda dengan memesan tiket secara
                online di LajuJaya.
              </p>
              <button
                className="btn btn-danger mx-2 mt-3 col-md-3 shadow"
                href="/register"
                role="button"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
