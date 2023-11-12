import React, { useEffect, useState } from "react";
import icon from "../../assets/icon.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const ListArmada = (props) => {
  const [emulatorTitle, setEmulatorTitle] = useState("");
  const [emulatorKet, setEmulatorKet] = useState("");
  const [emulatorIcon, setEmulatorIcon] = useState("");

  AOS.init();
  useEffect(() => {
    const { title, keterangan } = props;
    setTimeout(() => {
      setEmulatorTitle(title);
      setEmulatorKet(keterangan);
      setEmulatorIcon(<img src={icon} width={25} />);
    }, 2 * 1000);
  }, []);
  return (
    <>
      <div
        className="card m-4 p-3 justify-content-between shadow"
        data-aos="fade-up"
      >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <Link
              className="stretched-link btn-sm btn btn-link text-decoration-none fw-bold text-danger"
              to={`/armada/${props.armadaId}`}
              >
                <p className="fw-bold text-danger">
                  {emulatorTitle || (
                    <Skeleton count={1} width={250} height={20} />
                  )}
                </p>
              </Link>
              <div className="ms-2">
                <small>
                  {emulatorKet || <Skeleton count={1} width={100} />}
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

export default ListArmada;
