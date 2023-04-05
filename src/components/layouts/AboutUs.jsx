import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import banner from "../../assets/banner.jpg";

const AboutUs = () => {
  AOS.init();
  return (
    <div className="bg-white">
      <div className="about-section paddingTB60">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-6">
              <div
                className="about-title clearfix mx-4"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <h1 className="">
                  Tentang <span className="gradient-text">Kami</span>
                </h1>
                <h3>Laju Jaya Tour & Travel</h3>
                <p className="about-paddingB">
                  Laju Jaya adalah agen travel dan tour yang berlokasi di
                  Kabupaten Tulungagung. Perusahaan ini berdiri pada tahun 2020.
                  Kami selalu berusaha untuk memberikan pelayanan yang terbaik
                  kepada pelanggan / klien kami.{" "}
                </p>
                <p>
                  Selamat datang di Website Reservasi Travel LajuJaya. Silahkan
                  melakukan registrasi dan login menggunakan akun anda agar
                  dapat memesan tiket secara online.
                </p>
                <div className="about-icons"></div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <div
                className="about-img"
                data-aos="fade-down"
                data-aos-duration="800"
              >
                <img src={banner} className="rounded shadow" width={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
