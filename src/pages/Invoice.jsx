import AOS from "aos";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrintButton from "../components/layouts/PrintButton";
import Breadcrumb from "../components/layouts/Breadcrumb";

const Invoice = () => {
  AOS.init();
  const { id } = useParams();

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
      "http://localhost:3050/transaksi/" + id
    )
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;

        setDataTransaksi(responseAPI.data);
        setNama(responseAPI.data.nama);
        setOrderId(responseAPI.data.id);
        setAlamat(responseAPI.data.alamat);
        setTglBerangkat(responseAPI.data.tanggal);
        setJam(responseAPI.data.Jadwal_driver.Jam.jam)
        setTelepon(responseAPI.data.no_hp);
        setBank(responseAPI.data.bank);
        setVa(responseAPI.data.va_number);
        setStatus(responseAPI.data.paid);
        setTotal(responseAPI.data.total);
        setTglTransaksi(responseAPI.data.createdAt);
        setRute(responseAPI.data.Jadwal_driver.Rute.arah);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);
  console.log(dataTransaksi);

  const user = localStorage.getItem("authToken");

  if (user) {
    return (
      <div className="bg-dark">
        <Navbar />
        <div className="p-top bg-light">
          <Breadcrumb />
        </div>
        <div className="container-fluid my-4">
          <div className="card-body mx-4">
            <div
              className="container bg-light rounded p-5"
              id="invoice"
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
              <div className="row fw-bold">
                <ul className="list-unstyled">
                  <li className="text-black fw-bold">
                    {nama.toLocaleUpperCase()}
                  </li>
                  <li className="text-muted mt-1 fw-bold">{orderId}</li>
                  <li className="text-black mt-1 fw-bold">
                    {tglTransaksi.slice(0, 10)}
                  </li>
                </ul>
                <hr />
                <div className="">
                  <p>
                    Alamat{" "}
                    <span>
                      <small className="float-end">{alamat}</small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row fw-bold">
                <div className="">
                  <p>
                    Rute Travel
                    <span>
                      <small className="float-end">{rute}</small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row fw-bold">
                <div className="">
                  <p>
                    Jadwal Berangkat
                    <span>
                      <small className="float-end">
                        {tglBerangkat}
                        {", Pukul "}
                        {jam}
                      </small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row fw-bold">
                <div className="">
                  <p>
                    No Telepon
                    <span>
                      <small className="float-end">{telepon}</small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row fw-bold">
                <div className="">
                  <p>
                    VA Number
                    <span>
                      <small className="float-end">
                        {bank.toLocaleUpperCase()}
                        {" : "}
                        {va}
                      </small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row fw-bold">
                <div className="">
                  <p>
                    Status Pembayaran
                    <span>
                      <small className="float-end text-capitalize">
                        {status}
                      </small>
                    </span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="row text-black">
                <div className="col-xl-12">
                  <p className="float-end fw-bold">
                    Total : Rp. <span>{total}</span>
                  </p>
                </div>
                <hr />
              </div>
              <div className="text-center">
                <small className="text-danger fw-bold">{getYear()}</small>
                <p className="fw-bold">Laju Jaya Tour & Travel</p>
              </div>
            </div>
          </div>
        </div>
        <PrintButton />
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="p-top bg-light">
          <Breadcrumb />
        </div>
        <LoggedOut />
        <Footer />
      </>
    );
  }
};

export default Invoice;
