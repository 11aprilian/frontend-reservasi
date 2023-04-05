import React, { useEffect, useState } from "react";
import icon from "../../assets/icon.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListHistory = (props) => {
  AOS.init();
  const navigate = useNavigate();
  const [emulatorRute, setEmulatorRute] = useState("");
  const [emulatorOrderId, setEmulatorOrderId] = useState("");
  const [emulatorBank, setEmulatorBank] = useState("");
  const [emulatorPrice, setEmulatorPrice] = useState("");
  const [emulatorStatus, setEmulatorStatus] = useState("");
  const [emulatorButton, setEmulatorButton] = useState("");
  const [emulatorIcon, setEmulatorIcon] = useState("");
  const [orderID, setOrderID] = useState("");

  const orderDetail = () => {
    localStorage.setItem("orderId", orderID);
    navigate("/reservasi/invoice");
  };

  const skeletonEmu = () => {
    const { orderId, price, bank, rute, status } = props;
    setTimeout(() => {
      setEmulatorRute(rute);
      setEmulatorOrderId(orderId);
      setEmulatorBank("Transfer Via Bank " + bank.toUpperCase());
      setEmulatorPrice("Rp. " + price);
      setEmulatorStatus(status);
      setEmulatorIcon(<img src={icon} width={25} />);
    }, 2 * 1000);
  };

  useEffect(() => {
    skeletonEmu();
  }, []);

  return (
    <>
      <div className="card m-4 p-3 justify-content-between" data-aos="fade-up">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <a
                href="#"
                className="stretched-link text-decoration-none fw-bold text-danger"
                onMouseEnter={(e) => setOrderID(e.target.innerText)}
                onClick={() => {
                  orderDetail();
                }}
              >
                <p>
                  {emulatorOrderId || (
                    <Skeleton count={1} width={250} height={20} />
                  )}
                </p>
              </a>
              <small className="card-orderId">
                {emulatorRute || <Skeleton count={1} width={100} height={20} />}
              </small>
              <div className="card-text">
                <small>
                  {emulatorBank || <Skeleton count={1} width={200} />}
                </small>
              </div>
              <small>
                {emulatorPrice || <Skeleton count={1} width={100} />}
              </small>
              <div>
                <small>
                  {emulatorStatus || <Skeleton count={1} width={120} />}
                </small>
              </div>
            </div>
            <div className="">
              {emulatorIcon || <Skeleton count={1} width={25} height={25} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListHistory;
