import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start text-white bg-dark">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
        <section className="">
          <div className="container-fluid text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Laju Jaya Tour & Travel
                </h6>
                <p>
                  RT.01/RW.03 Desa Tapan Kec. Kedungwaru, Kab. Tulungagung Jawa
                  Timur 66229
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Link</h6>
                <p>
                  <Link to="/" className="text-reset text-decoration-none">
                    Beranda
                  </Link>
                </p>
                <p>
                  <Link to="/rute" className="text-reset text-decoration-none">
                    Rute Travel
                  </Link>
                </p>
                <p>
                  <Link to="" className="text-reset text-decoration-none">
                    Kebijakan Privasi
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Kontak</h6>
                <p>
                  <i className="fas fa-envelope"></i>
                  lajujaya712@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone"></i> +62 821-4053-4911
                </p>
                <p>
                  <i className="fas fa-print"></i> +62 852-5722-5170
                </p>
              </div>
            </div>
          </div>
        </section>
        <div>
          <p className="m-auto text-center text-secondary">
            © 2023 Laju Jaya Tour & Travel - All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
