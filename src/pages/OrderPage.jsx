import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import OrderForm from "../components/layouts/OrderForm";
import LoggedOut from "../components/layouts/LoggedOut";

const OrderPage = () => {
  const user = localStorage.getItem("authToken");
  if (user) {
    return (
      <>
        <Navbar />
        <OrderForm />
        <Footer />
      </>
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

export default OrderPage;
