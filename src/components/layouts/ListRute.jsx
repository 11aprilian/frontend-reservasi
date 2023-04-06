import React, { useEffect, useState } from "react";
import icon from "../../assets/icon.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ListRute = (props) => {
  const [emulatorTitle, setEmulatorTitle] = useState("");
  const [emulatorLowerTitle, setEmulatorLowerTitle] = useState("");
  const [emulatorPrice, setEmulatorPrice] = useState("");
  const [emulatorIcon, setEmulatorIcon] = useState("");

  AOS.init();
  useEffect(() => {
    const { title, price } = props;
    setTimeout(() => {
      setEmulatorTitle(title);
      setEmulatorLowerTitle("Rute travel arah " + title);
      setEmulatorPrice("Rp. " + price);
      setEmulatorIcon(<img src={icon} width={25} />);
    }, 2 * 1000);
  }, []);
  return (
    <>
      <div className="card m-4 p-3 justify-content-between" data-aos="fade-up">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <p className="fw-bold text-danger">
                {emulatorTitle || (
                  <Skeleton count={1} width={250} height={20} />
                )}
              </p>
              <small className="card-text">
                <span className="text-capitalize">
                  {emulatorLowerTitle || <Skeleton count={1} width={350} />}
                </span>
              </small>
              <div>
                <small>
                  {emulatorPrice || <Skeleton count={1} width={100} />}
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

export default ListRute;
