import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import OrderForm from "../components/layouts/OrderForm";
import LoggedOut from "../components/layouts/LoggedOut";
import Breadcrumb from "../components/layouts/Breadcumb";

const OrderPage = () => {
  const user = localStorage.getItem("authToken");

  if (user) {
    return (
      <div>
        <Navbar />
        <div className="p-top bg-light">
          <Breadcrumb />
        </div>
        <OrderForm />
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="p-top">
          <Breadcrumb />
        </div>
        <LoggedOut />
        <Footer />
      </>
    );
  }
};

export default OrderPage;
