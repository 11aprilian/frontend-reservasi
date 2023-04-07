import React from "react";
import { BsFillPrinterFill } from "react-icons/bs";

const PrintButton = () => {
  const Print = () => {
    let printContents = document.getElementById("invoice").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <button
        className="btn btn-danger shadow-lg float"
        onClick={Print}
        data-aos="fade-left"
      >
        <BsFillPrinterFill size={25} />
      </button>
    </div>
  );
};

export default PrintButton;
