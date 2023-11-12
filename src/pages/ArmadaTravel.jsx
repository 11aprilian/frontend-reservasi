import React, { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../components/layouts/Footer";
import ListArmada from "../components/layouts/ListArmada";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/layouts/Breadcrumb";

const ArmadaTravel = () => {
  const [dataArmada, setDataArmada] = useState([]);

  const fetchArmada = () => {
    Axios.get("http://localhost:3050/armada")
      .then((result) => {
        const responseAPI = result.data;

        setDataArmada(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchArmada();
  }, []);

  return (
    <div className="bg-light">
      <Navbar />
      <div className="p-top bg-light">
        <Breadcrumb />
      </div>
      <div className="min-vh-100">
        {dataArmada.map((armada) => {
          return (
            <ListArmada key={armada.id} title={armada.nama} armadaId={armada.id} keterangan={armada.keterangan} />
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ArmadaTravel;
