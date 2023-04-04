import { useEffect, useState } from "react";
import "./Login.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import { gapi } from "gapi-script";

function Login() {
  const navigate = useNavigate();
  AOS.init();
  const clientId = "513009040271-p09lrpl30dbe94micdr009kevohsapv7.apps.googleusercontent.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDataForm, setUserDataForm] = useState(null);
  const [change, setChange] = useState("password");
  const [loginButton, setLoginButton] = useState(true);
  const [logoutButton, setLogoutButton] = useState(false);
  const [AuthUser, setAuthUser] = useState(null);
  const [form, setForm] = useState(true);

  // logout via email
  const LogoutHandle = () => {
    signoutSuccess();
  };
  // Akhir Logout via email

  // Login via email
  const LoginHandle = async () => {
    try {
      let hasil = await fetch('https://bronze-cape-buffalo-sari.cyclic.app/user/login', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          "User-Agent":"Thunder Client (https://www.thunderclient.com)",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {email: email, password: password}
          )
      })
      hasil = await hasil.json();
      console.log(hasil);
      if(hasil.token){
          localStorage.setItem("authToken",hasil.token);
          
          try {
            let userData = await fetch('https://bronze-cape-buffalo-sari.cyclic.app/user/profile', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem("authToken")
              }
            })
            userData = await userData.json()
            userData = await userData.data;
            localStorage.setItem("userlogin", JSON.stringify(userData));
          } catch (error) {
            loginFailed();
          }
          await Swal.fire({
            title: "Sweet!",
            text: hasil.message,
            icon: "success",
            confirmButtonText: '<i className="fa fa-thumbs-up"></i> Great!',
          });
          navigate("/");
      }else{
        throw "Login Salah";
      }
    } catch (error) {
      loginFailed();
    }
  };

  const failureSuccess = (res) => {
    console.log("Login Failed! : ", res);
  };

  // Login Gagal
  const loginFailed = () => {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Data tidak boleh kosong atau data yang anda masukkan salah",
    });
  };
  // Akhir Login Gagal

  // Sign out
  const signoutSuccess = () => {
    Swal.fire({
      title: "Anda ingin Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "warning",
          title: "Anda telah logout!",
          confirmButtonText: '<i className="fa fa-times"></i> Silahkan Login Kembali!',
        });
        navigate("/");
        setLoginButton(true);
        setLogoutButton(false);
        setForm(true);
        localStorage.removeItem("token");
        localStorage.removeItem("userlogin"); 
        localStorage.removeItem("authToken"); 
        console.clear();
      }
    });
  };
  // Akhir Signout

  const getpassword = () => {
    setChange("text");
    console.log(change);
  };

  const hidepassword = () => {
    setChange("password");
  };

  const user = localStorage.getItem("token");
  const user1 = localStorage.getItem("userlogin");

  useEffect(() => {
    fetch("https://631cc4864fa7d3264cb66955.mockapi.io/UserRegist", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setUserDataForm(data));
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  if (user) {
    return (
      <>
        <Navbar />
        <div id="containerlogin">
          <div className="row d-flex justify-content-center">
            <div data-aos="flip-in" data-aos-anchor-placement="center-center" data-aos-duration="1500">
              {user || user1 ? (
                <>
                  <div id="services">
                    <h1 id="tagline" className="section-heading">
                      Logout
                    </h1>
                    <h5 className="section-subheading">Logout membuat akses anda terbatas</h5>
                    <hr />
                    <br />
                  </div>
                </>
              ) : (
                <>
                  <div id="services">
                    <h1 id="tagline" className="section-heading">
                      Login
                    </h1>
                    <h5 className="section-subheading">Silahkan Login terlebih dahulu</h5>
                    <hr />
                    <br />
                  </div>
                </>
              )}
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12" style={{ textAlign: "center", padding: "6rem" }}>
                <div className="col-12 mb-3" id="signInDiv">
                  {/* <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={signoutSuccess} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (user1) {
    return (
      <>
        <Navbar />
        <div id="containerlogin">
          <div className="row d-flex justify-content-center">
            <div data-aos="flip-in" data-aos-anchor-placement="center-center" data-aos-duration="1500">
              {user || user1 ? (
                <>
                  <div id="services">
                    <h1 id="tagline" className="section-heading">
                      Logout
                    </h1>
                    <h5 className="section-subheading">Logout membuat akses anda terbatas</h5>
                    <hr />
                    <br />
                  </div>
                </>
              ) : (
                <>
                  <div id="services">
                    <h1 id="tagline" className="section-heading">
                      Login
                    </h1>
                    <h5 className="section-subheading">Silahkan Login terlebih dahulu</h5>
                    <hr />
                    <br />
                  </div>
                </>
              )}
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12" style={{ textAlign: "center", padding: "6rem" }}>
                <div className="col-12 mb-3">
                  <button className="noselect" onClick={() => LogoutHandle()}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div id="containerlogin">
          <div className="row d-flex justify-content-center">
            <div data-aos="flip-in" data-aos-anchor-placement="center-center" data-aos-duration="1500">
              <div id="services">
                <h1 id="tagline" className="section-heading">
                  Login
                </h1>
                <h5 className="section-subheading">Silahkan Login terlebih dahulu</h5>
                <hr />
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="form-body sajad">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Login</h3>
                <p>Silahkan login terlebih dahulu</p>
                <form className="requires-validation">
                  <div className="col-md-12">
                    <input className="form-control" type="email" name="email" placeholder="E-mail Address" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-md-12">
                    {change === "password" && (
                      <>
                        <input className="form-control" type="password" name="password" id="password-input" placeholder="Password" required onChange={(e) => setPassword(e.target.value, setChange(e.target.type))} />
                        <button className="btn-tombol mt-4" onClick={(e) => getpassword(e.preventDefault())}>
                          Show Password
                        </button>
                      </>
                    )}
                    {change === "text" && (
                      <>
                        <input className="form-control" type="text" name="password" id="password-input" placeholder="Password" value={password} />
                        <button className="btn-tombol mt-4" onClick={(e) => hidepassword(e.preventDefault())}>
                          Hide Password
                        </button>
                      </>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <label className="form-check-label">
                      <h6>
                        <b>I confirm that all data are correct and can be responsible</b>
                      </h6>
                    </label>
                  </div>
                  <div className="form-button mt-3">
                    <button id="submit" type="submit" className="noselect" onClick={(e) => LoginHandle(e.preventDefault())}>
                      Login
                    </button>
                  </div>
                  <div className="col-12 mb-3">
                    {/* <GoogleLogin clientId={clientId} buttonText="Continue With Google" onSuccess={loginSuccess} onFailure={failureSuccess} cookiePolicy={"single_host_origin"} /> */}
                  </div>
                  <div className="text-center">
                    <h6 style={{ color: "black" }}>
                      Not a member?
                      <a style={{ textDecoration: "none" }} href="/Registrasi">
                        Register
                      </a>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;