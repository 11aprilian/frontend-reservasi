import AOS from "aos";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { Link } from "react-router-dom";

const Invoice = () => {
  AOS.init();
  const orderID = localStorage.getItem("orderId");

  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [nama, setNama] = useState("");
  const [orderId, setOrderId] = useState("");
  const [tglTransaksi, setTglTransaksi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rute, setRute] = useState("");
  const [tglBerangkat, setTglBerangkat] = useState("");
  const [jam, setJam] = useState("");
  const [telepon, setTelepon] = useState("");
  const [bank, setBank] = useState("");
  const [va, setVa] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");

  const fetchTransaksi = () => {
    Axios.get(
      "https://backend-reservasi-production.up.railway.app/transaksi/" + orderID
    )
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;

        setDataTransaksi(responseAPI.data);
        setNama(responseAPI.data.nama);
        setOrderId(responseAPI.data.id);
        setAlamat(responseAPI.data.alamat);
        setTglBerangkat(responseAPI.data.tanggal);
        setTelepon(responseAPI.data.no_hp);
        setBank(responseAPI.data.bank);
        setVa(responseAPI.data.va_number);
        setStatus(responseAPI.data.paid);
        setTotal(responseAPI.data.total);
        setTglTransaksi(responseAPI.data.createdAt);
        setRute(responseAPI.data.Rute.arah);
        setJam(responseAPI.data.Jadwal.jam);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <div className="bg-dark">
      <Navbar />
      <div className="container-fluid my-4">
        <div className="card-body mx-4">
          <div
            className="container bg-light rounded p-5"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="text-center mt-3 mb-5">
              <img
                src={logo}
                alt=""
                className="rounded rounded-pill border"
                height={80}
              />
            </div>
            <div className="row">
              <ul className="list-unstyled">
                <li className="text-black">{nama.toLocaleUpperCase()}</li>
                <li className="text-muted mt-1">{orderId}</li>
                <li className="text-black mt-1">{tglTransaksi.slice(0, 10)}</li>
              </ul>
              <hr />
              <div className="">
                <p>Alamat</p>
              </div>
              <div className="">
                <p className="float-end">{alamat}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>Rute Travel</p>
              </div>
              <div className="">
                <p className="float-end">{rute}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>Tanggal Berangkat</p>
              </div>
              <div className="">
                <p className="float-end">{tglBerangkat}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>Jam Berangkat</p>
              </div>
              <div className="">
                <p className="float-end">{jam}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>No Telepon</p>
              </div>
              <div className="">
                <p className="float-end">{telepon}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>Bank</p>
              </div>
              <div className="">
                <p className="float-end">{bank.toLocaleUpperCase()}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>VA Number</p>
              </div>
              <div className="">
                <p className="float-end">{va}</p>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="">
                <p>Status Pembayaran</p>
              </div>
              <div className="">
                <p className="float-end text-capitalize">{status}</p>
              </div>
              <hr />
            </div>
            <div className="row text-black">
              <div className="col-xl-12">
                <p className="float-end fw-bold">
                  Total: Rp. <span>{total}</span>
                </p>
              </div>
              <hr />
            </div>
            <div className="text-center">
              <Link className="text-decoration-none text-danger" to="/history">
                Kembali
              </Link>
              <p>Laju Jaya Tour & Travel</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Invoice;
