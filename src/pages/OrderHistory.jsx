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

    const fetchTransaksi = () => {
      Axios.get(
        "https://backend-reservasi-production.up.railway.app/transaksi/user/" +
          userID,
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
          console.log("data API", result.data);
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
        <Breadcrumb/>
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
        <LoggedOut />
        <Footer />
      </>
    );
  }
};

export default OrderHistory;
