import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/layouts/Footer";
import ListRute from "../components/layouts/ListRute";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/layouts/Breadcrumb";

const RuteTravel = () => {
  const [dataRute, setDataRute] = useState([]);

  const fetchRute = () => {
    Axios.get("http://localhost:3050/rute")
      .then((result) => {
        const responseAPI = result.data;

        setDataRute(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRute();
  }, []);

  return (
    <div className="bg-light">
      <Navbar />
      <div className="p-top bg-light">
        <Breadcrumb />
      </div>
      <div className="min-vh-100">
        {dataRute.map((rute) => {
          return (
            <ListRute key={rute.id} title={rute.arah} price={rute.harga} />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default RuteTravel;
