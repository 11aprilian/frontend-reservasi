import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Hero from "../components/layouts/Hero";
import Onboard from "../components/layouts/AboutUs";
import LoggedIn from "../components/layouts/LoggedIn";
import Step from "../components/layouts/Step";
import Services from "../components/layouts/Services";
import WelcomeToast from "../components/layouts/WelcomeToast";

const LandingPage = () => {
  const user = localStorage.getItem("authToken");
  if (user) {
    return (
      <div className="gradient-custom min-vh-100">
        <Navbar />
        <WelcomeToast/>
        <LoggedIn />
        <Step />
        <Services/>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Hero />
        <Onboard />
        <Footer />
      </div>
    );
  }
};

export default LandingPage;
