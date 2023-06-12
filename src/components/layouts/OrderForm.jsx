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
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import id from "date-fns/locale/id"; // Impor modul bahasa Indonesia
import { format } from 'date-fns';

registerLocale("id", id); // Mendaftarkan bahasa Indonesia
setDefaultLocale("id");

const OrderForm = () => {
  AOS.init();
  const navigate = useNavigate();
  const [dataRute, setDataRute] = useState([]);
  const [dataJam, setDataJam] = useState([]);

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [rute, setRute] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [bank, setBank] = useState("");
  const [harga, setHarga] = useState("");
  const [hari, setHari] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'd MMMM yyyy', { locale: id });
    setTanggal(formattedDate);    
    if (date) {
      const days = ['1', '2', '3', '4', '5', '6', '7'];
      const dayIndex = date.getDay();
      const selectedDayName = days[dayIndex];
      setHari(selectedDayName);
    } else {
      setHari('');
    }
  };

  const setTransaksi = async () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    const trans_id = "LAJUJAYA" + small_id.toUpperCase();

    if (
      nama === "" ||
      alamat === "" ||
      telepon === "" ||
      rute === "" ||
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
        JadwalDriverId: jadwal,
        nama: nama,
        tanggal: tanggal,
        alamat: alamat,
        no_hp: telepon,
        bank: bank,
      };

      try {
        const trans = await Axios.post(
          "http://localhost:3050/transaksi",
          transaksi,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              authorization: localStorage.getItem("authToken"),
            },
          }
        );
        Swal.fire({
          icon: "success",
          text: "VA Number : " + trans.data.va_number,
        }).then(() => {
          navigate(`/reservasi/${trans_id}`);
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
    Axios.get("http://localhost:3050/rute")
      .then((result) => {
        const responseAPI = result.data;
        setDataRute(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJam = () => {
    Axios.get("http://localhost:3050/jam/")
      .then((result) => {
        const responseAPI = result.data;
        setDataJam(responseAPI.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRuteHarga = async () => {
    Axios.get("http://localhost:3050/rute/" + rute)
      .then((result) => {
        const responseAPI = result.data;
        const ruteData = responseAPI.data;

        setHarga(ruteData.harga);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchJadwal = async () => {
    Axios.get("http://localhost:3050/jadwaldriver/all/" + hari +"/"+ rute +"/"+ jam)
      .then((result) => {
        const responseAPI = result.data;
        const jadwalDriver = responseAPI.data;
        console.log(jadwalDriver);
        setJadwal(jadwalDriver.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    fetchRute();
    fetchJam();
  }, []);
 
  console.log(hari);
  console.log(tanggal);
  console.log(rute);
  console.log(jam);
  console.log(jadwal);

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
                        <label className="my-2 ms-2">Pilih Rute</label>
                        <select
                          id="rute"
                          className="form-control"
                          onChange={(e) => {
                            setRute(e.target.value);
                          }}
                          onMouseLeave={(e) => {
                            fetchRuteHarga();
                          }}
                        >
                          <option>Pilih Rute</option>
                          {dataRute.map((rute) => {
                            return (
                              <option
                                key={rute.id}
                                title={rute.arah}
                                value={rute.id}
                              >
                                {rute.arah}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label className="my-2 ms-2">
                          Pilih Tanggal Terlebih Dahulu
                        </label>

                        <DatePicker
                          placeholderText="Tanggal"
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          minDate={new Date()} 
                          selected={selectedDate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="my-2 ms-2">Pilih Jam</label>
                        <select
                          id="jadwal"
                          className="form-control"
                          onChange={(e) => {
                            setJam(e.target.value);
                          }}
                          onMouseLeave={fetchJadwal}
                        >
                          <option>Pilih Jam Berangkat</option>
                          {dataJam.map((jam) => {
                            return (
                              <option key={jam.id} value={jam.id}>
                                {jam.jam}
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
                      className="my-3 btn btn-danger shadow"
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
