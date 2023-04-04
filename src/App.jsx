import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RuteTravel from "./pages/RuteTravel";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import OrderPage from "./pages/OrderPage";
import Invoice from "./pages/Invoice";
import OrderHistory from "./pages/OrderHistory";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/rute" element={<RuteTravel/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/login" element={<LoginUser/>}/>
        <Route path="/reservasi" element={<OrderPage/>}/>
        <Route path="/reservasi/invoice" element={<Invoice/>}/>
        <Route path="/history" element={<OrderHistory/>}/>
      </Routes>
    </>
  )
}

export default App
