import React from "react";

const LoggedOut = () => {
  return (
    <div>
      <div className="d-flex align-items-center bg-light justify-content-center vh-100">
        <div className="text-center">
          <p className="fs-1 fw-bold">
            {" "}
            <span className="text-danger">Opps!</span> Anda telah Logout.
          </p>
          <p className="small">
            Silahkan login menggunakan akun yang sudah anda buat!
          </p>
          <a href="/" className="btn btn-danger">
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;
