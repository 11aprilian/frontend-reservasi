import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid } from "uuid";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/logo.png";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  AOS.init();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const [dataRute, setDataRute] = useState([]);
  const [dataJadwal, setDataJadwal] = useState([]);

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [rute, setRute] = useState("");
  const [jam, setJam] = useState("");
  const [bank, setBank] = useState("");
  const [harga, setHarga] = useState("");
  const tanggal = startDate.toString().slice(4, 15);

  const setTransaksi = async () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const trans_id = "LAJUJAYA" + small_id.toUpperCase();

    if (
      nama === "" ||
      alamat === "" ||
      telepon === "" ||
      rute === "" ||
      jam === "" ||
      bank === "" ||
      tanggal === "" ||
      harga === ""
    ) {
      Swal.fire({
        icon: "error",
        text: "Data Tidak Boleh Kosong!",
      });
    } else {
      Swal.fire({
        text: "Berhasil reservasi, Mohon segera selesaikan pembayaran!",
        icon: "success",
        showConfirmButton: false,
      });

      let transaksi = {
        payment_type: "bank_transfer",
        bank_transfer: {
          bank: bank,
        },
        transaction_details: {
          order_id: trans_id,
          gross_amount: harga,
        },
        UserId: localStorage.getItem("userId"),
        RuteId: rute,
        JadwalId: jam,
        nama: nama,
        alamat: alamat,
        no_hp: telepon,
        tanggal: tanggal,
        bank: bank,
      };
      console.log(transaksi);
      localStorage.setItem("orderId", trans_id);

      try {
        const trans = await Axios.post(
          "https://backend-reservasi-production.up.railway.app/transaksi",
          transaksi,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authToken"),
            },
          }
        );
        console.log(trans.data);
        Swal.fire({
          icon: "success",
          text: "VA Number : " + trans.data.va_number,
        }).then(() => {
          navigate("/reservasi/invoice");
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Transaksi Gagal!",
          icon: "error",
        });
      }
    }
  };

  const fetchRute = () => {
    Axios.get("https://backend-reservasi-production.up.railway.app/rute")
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;

        setDataRute(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJadwal = () => {
    Axios.get("https://backend-reservasi-production.up.railway.app/jadwal")
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;

        setDataJadwal(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRuteHarga = async () => {
    let ruteHarga = await fetch(
      `https://backend-reservasi-production.up.railway.app/rute/` + rute,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    ruteHarga = await ruteHarga.json();
    ruteHarga = await ruteHarga.data.harga;
    setHarga(ruteHarga);
  };

  useEffect(() => {
    fetchRute();
    fetchJadwal();
  }, []);

  return (
    <>
      <section className="m-4">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="text-black">
                <div
                  className="card-body p-md-5"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <a href="/">
                    <img src={logo} alt="" width={250} />
                  </a>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="my-2 ms-2">Nama</label>
                        <input
                          type="name"
                          className="form-control"
                          id="nama"
                          placeholder="Masukkan Nama"
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="my-2 ms-2">Alamat</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alamat"
                        placeholder="Masukkan Alamat Anda"
                        onChange={(e) => setAlamat(e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label className="my-2 ms-2">No Telepon</label>
                        <input
                          type="text"
                          className="form-control"
                          id="no_hp"
                          placeholder="No Telp"
                          onChange={(e) => setTelepon(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="my-2 ms-2">Rute</label>
                        <select
                          id="rute"
                          className="form-control"
                          onChange={(e) => {
                            setRute(e.target.value.slice(0, 1));
                          }}
                          onMouseLeave={(e) => {
                            fetchRuteHarga();
                          }}
                        >
                          <option>Pilih Rute</option>
                          {dataRute.map((rute) => {
                            return (
                              <option key={rute.id} title={rute.arah}>
                                {rute.id}
                                {" ). "}
                                {rute.arah}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="my-2 ms-2">Jam Berangkat</label>
                        <select
                          id="jadwal"
                          className="form-control"
                          onMouseLeave={(e) =>
                            setJam(e.target.value.slice(0, 1))
                          }
                        >
                          <option>Pilih Jam Berangkat</option>
                          {dataJadwal.map((jadwal) => {
                            return (
                              <option key={jadwal.id} jadwal={jadwal.jam}>
                                {jadwal.id}
                                {" ). Jam Berangkat Pukul "}
                                {jadwal.jam}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="my-2 ms-2">Pilih Bank Transfer</label>
                        <select
                          id="inputBank"
                          className="form-control"
                          onMouseLeave={(e) => {
                            setBank(e.target.value.toLowerCase());
                          }}
                        >
                          <option>Permata</option>
                          <option>BRI</option>
                          <option>BCA</option>
                          <option>BNI</option>
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label className="my-2 ms-2">Tanggal Berangkat</label>
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label className="my-2 ms-2">Harga</label>
                        <input
                          type="text"
                          className="form-control"
                          id="total"
                          placeholder={"Rp. " + harga}
                          readOnly
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="my-3 btn btn-danger"
                      onClick={(e) => setTransaksi(e.preventDefault())}
                    >
                      Reservasi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderForm;
