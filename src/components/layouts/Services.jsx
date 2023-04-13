import React from "react";
import services from "../../assets/services.png";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { GiHandOk } from "react-icons/gi";
import AOS from "aos";

const Services = () => {
  AOS.init();
  return (
    <div className="py-4 bg-light" data-aos="fade-up" data-aos-duration="800">
      <section className="" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src={services} className="" width={400} alt="" />
            </div>

            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="d-flex m-2">
                <div className="p-4 me-4 col-2">
                  <div>
                    <GiHandOk size={40} />
                  </div>
                </div>
                <div>
                  <h4 className="fw-bolder">MUDAH</h4>
                  <p className="description">
                    Kamu tidak perlu repot konfirmasi pembayaran, karena semua
                    sudah dikonfirmasi otomatis setelah kamu melakukan
                    pembayaran.
                  </p>
                </div>
              </div>

              <div className="d-flex m-2">
                <div className="p-4 me-4 col-2">
                  <div>
                    <BsFillRocketTakeoffFill size={30} />
                  </div>
                </div>
                <div>
                  <h4 className="fw-bolder">CEPAT</h4>
                  <p className="description">
                    Tidak perlu konfirmasi dari kami! Kamu hanya perlu mengisi
                    form yang disediakan oleh LajuJaya dan melakukan pembayaran.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
