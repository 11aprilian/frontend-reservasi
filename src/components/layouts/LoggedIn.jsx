import AOS from "aos";
import React from "react";
import welcome from "../../assets/welcome.png";

const LoggedIn = () => {
  AOS.init();
  const user = localStorage.getItem("userName").replace(/["]/g, "");
  return (
    <div className="">
      <div className="container">
        <div className="row gx-5 mt-3 align-items-center justify-content-center">
          <div className="col-lg-8 col-xl-7 col-xxl-6">
            <div
              className="my-5 text-center text-xl-start"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <h1 className="text-uppercase fw-bolder mb-5">
                Halo, <span>{user}</span>! Selamat Datang di Web Reservasi{" "}
                <span className="gradient-text"> LajuJaya!</span>
              </h1>
              <p className="my-5">
                Ayo reservasi perjalananmu di Laju Jaya Tour & Travel!
                <br />
                Dan permudah proses transaksi travelmu disini!
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                <a className="btn btn-danger btn-lg px-4 " href="/reservasi">
                  <small>Reservasi</small>
                </a>
                <a className="btn btn-outline-dark btn-lg px-4" href="/rute">
                  <small>Lihat Rute</small>
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            <img
              className=" rounded-3 my-5"
              height={420}
              src={welcome}
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
