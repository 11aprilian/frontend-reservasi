import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ListHistory from "../components/layouts/ListHistory";
import LoggedOut from "../components/layouts/LoggedOut";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Breadcrumb from "../components/layouts/Breadcrumb";

const OrderHistory = () => {
  const user = localStorage.getItem("authToken");

  if (user) {
    const [dataTrans, setDataTrans] = useState([]);
    const { id } = useParams();
    const [status, setStatus] = useState("");

    const fetchTransaksi = () => {
      Axios.get(
        "http://localhost:3050/transaksi/user/" +
          id +
          "/" +
          status,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("authToken"),
          },
        }
      )
        .then((result) => {
          const responseAPI = result.data;
          setDataTrans(responseAPI.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      fetchTransaksi();
    }, []);

    return (
      <div className="bg-light">
        <Navbar />
        <div className="p-top bg-light">
          <Breadcrumb />
        </div>
        <div
          className="container mt-4"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <div className="form-check form-check-inline">
            <input
              className="form-check-input small"
              type="radio"
              name="flexRadioDefault"
              onFocus={() => setStatus("settlement")}
              onClick={() => {
                fetchTransaksi();
              }}
            />
            <label className="form-check-label small text-secondary">
              Dibayar
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input small"
              type="radio"
              name="flexRadioDefault"
              onFocus={() => setStatus("pending")}
              onClick={() => {
                fetchTransaksi();
              }}
            />
            <label className="form-check-label small text-secondary">
              Belum Dibayar
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input small"
              type="radio"
              name="flexRadioDefault"
              onFocus={() => setStatus("expire")}
              onClick={() => {
                fetchTransaksi();
              }}
            />
            <label className="form-check-label small text-secondary">
              Tidak Dibayar
            </label>
          </div>
        </div>

        <div className="min-vh-100">
          {dataTrans.map((trans) => {
            return (
              <ListHistory
                key={trans.id}
                rute={trans.Jadwal_driver.Rute.arah}
                orderId={trans.id}
                bank={trans.bank}
                price={trans.total}
                status={trans.paid}
              />
            );
          })}
        </div>
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

export default OrderHistory;
