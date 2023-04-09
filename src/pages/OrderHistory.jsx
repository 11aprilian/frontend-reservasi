import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ListHistory from "../components/layouts/ListHistory";
import LoggedOut from "../components/layouts/LoggedOut";
import Axios from "axios";
import Breadcrumb from "../components/layouts/Breadcumb";

const OrderHistory = () => {
  const user = localStorage.getItem("authToken");

  if (user) {
    const [dataTrans, setDataTrans] = useState([]);
    const userID = localStorage.getItem("userId");
    const [status, setStatus] = useState("");
    const [transLength, setTransLength] = useState(1);

    const fetchTransaksi = () => {
      Axios.get(
        "https://backend-reservasi-production.up.railway.app/transaksi/user/" +
          userID +
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

          setTransLength(responseAPI.data.length);
          localStorage.setItem("transArray", transLength);
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
              onClick={() => setStatus("settlement")}
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
              onClick={() => setStatus("pending")}
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
              onClick={() => setStatus("expire")}
            />
            <label className="form-check-label small text-secondary">
              Expire
            </label>
          </div>

          <div className="form-check-inline">
            <button
              className="btn small btn-sm btn-secondary shadow-sm filter-btn"
              onClick={() => {
                fetchTransaksi();
              }}
            >
              Set Filter
            </button>
          </div>
        </div>

        <div className="min-vh-100">
          {dataTrans.map((trans) => {
            return (
              <ListHistory
                key={trans.id}
                rute={trans.Rute.arah}
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
