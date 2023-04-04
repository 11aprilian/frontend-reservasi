import AOS from "aos";
import React from "react";
import logo from "../../assets/logo.png";
import {
  BsFillPersonPlusFill,
  BsFillPersonCheckFill,
  BsPersonBadgeFill,
  BsCashCoin,
} from "react-icons/bs";

const Step = () => {
  AOS.init();
  return (
    <div>
      <section className="py-5 bg-dark text-white" id="features">
        <div
          className="container px-5 my-5"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="row gx-5">
            <div className="">
              <div className="row gx-5 border p-5 rounded-5 row-cols-1 row-cols-md-2">
                <div className="col mb-5 h-100">
                  <div className="mb-3">
                    <BsFillPersonPlusFill size={30} />
                  </div>
                  <h2 className="h5 fw-bold">Registrasi</h2>
                  <p className="mb-0">
                    Selamat! Kamu telah terdaftar pada web reservasi Laju Jaya!
                  </p>
                </div> 
                <div className="col mb-5 h-100">
                  <div className="mb-3">
                    <BsFillPersonCheckFill size={30} />
                  </div>
                  <h2 className="h5 fw-bold">Login</h2>
                  <p className="mb-0">
                    Sepertinya kamu sudah login, karena jika tidak login kamu
                    tidak akan sampai sini.
                  </p>
                </div>
                <div className="col mb-5 mb-md-0 h-100">
                  <div className="mb-3">
                    <BsPersonBadgeFill size={30} />
                  </div>
                  <h2 className="h5 fw-bold">Reservasi</h2>
                  <p className="mb-0">
                    Cari tombol reservasi pada device yang kamu gunakan, atau
                    kamu bisa melihat rute yang kamu butuhkan, lalu isi form
                    yang telah disediakan!
                  </p>
                </div>
                <div className="col h-100">
                  <div className="mb-3">
                    <BsCashCoin size={30} />
                  </div>
                  <h2 className="h5 fw-bold">Bayar</h2>
                  <p className="mb-0">
                    Pembayaran disediakan via transfer bank. Setelah kamu
                    membayar, invoice akan kamu terima secara otomatis.
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

export default Step;
