import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Hero from "../components/layouts/Hero";
import Onboard from "../components/layouts/Onboard";
import LoggedIn from "../components/layouts/LoggedIn";
import Step from "../components/layouts/Step";

const LandingPage = () => {
  const user = localStorage.getItem("authToken");
  if (user) {
    return (
      <div className="gradient-custom ">
        <Navbar />
        <LoggedIn />
        <Step />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="gradient-custom">
        <Navbar />
        <Hero />
        <Onboard />
        <Footer />
      </div>
    );
  }
};

export default LandingPage;
