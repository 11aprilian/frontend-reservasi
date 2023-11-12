import AOS from "aos";
import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Breadcrumb from "../components/layouts/Breadcrumb";
import Footer from "../components/layouts/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { GiCarSeat } from "react-icons/gi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const ArmadaDetail = () => {
  AOS.init();
  const [dataArmada, setDataArmada] = useState([""]);
  const [dataSeat, setDataSeat] = useState([""]);
  const { id } = useParams();

  const fetchSeat = () => {
    axios.get("http://localhost:3050/seat/armada/" + id).then((result) => {
      const responseAPI = result.data.data;
      setDataSeat(responseAPI);
    });
  };

  const fetchArmada = () => {
    axios.get("http://localhost:3050/armada/" + id).then((result) => {
      const responseAPI = result.data.data;
      setDataArmada(responseAPI);
    });
  };

  useEffect(() => {
    fetchSeat();
    fetchArmada();
  }, []);

  return (
    <div className="bg-light">
      <Navbar />
      <div className="p-top bg-light">
        <Breadcrumb />
      </div>
      <div
        className="my-4 container"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2 className="my-4 text-danger fw-bolder">{dataArmada.nama}</h2>

        <div className="row">
          <div className="col-md-8">
            <img
              className="img-fluid rounded"
              src={dataArmada.gambar}
              width={1000}
              alt=""
            />
          </div>

          <div className="col-md-4">
            <h3 className="my-2 fw-bolder">Keterangan</h3>
            <p className="text-secondary">{dataArmada.keterangan}</p>

            {/* start seat */}
            <div id="seat">
              <p>
                Posisi tempat duduk berdasarkan nomor seat {dataArmada.nama}
              </p>
              <div className="row text-center bg-secondary rounded text-light mx-1">
                <div className="col-6 p-3 my-4 border-end"><MdAirlineSeatReclineNormal/>{" "}1</div>
                <div className="col-6 p-3 my-4 border-start"><GiCarSeat />{" "}Driver</div>
                {dataSeat.map((seat, index) => {
                  // Jika indeks 0 (nomor pertama), jangan tampilkan
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <div key={seat.id} className="col-4 p-3 my-3">
                        <MdAirlineSeatReclineNormal/>{" "}
                      {seat.nomor}
                    </div>
                  );
                })}
                <div className="my-2 border-top border-2">Bagasi</div>
              </div>
            </div>
            {/* end seat */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArmadaDetail;
