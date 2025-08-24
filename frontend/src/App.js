import { Routes, Route, Navigate } from "react-router-dom";

// ПУБЛИК
import LandingPage from "./pages/landingPage/LandingPage";

// ЛОГИН + ДАРААХ ХУУДАСНУУД
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Company from "./pages/company/Company";
import Register from "./pages/register/Register";

// Одоо mock хамгаалалт (дараа нь backend-тэй солино)
const isAuthed = () => localStorage.getItem("authed") === "1";
const Private = ({ children }) => (isAuthed() ? children : <Navigate to="/login" replace />);

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Private (нэвтэрсний дараа) */}
      <Route path="/home" element={<Private><Home /></Private>} />
      <Route path="/company" element={<Private><Company /></Private>} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

       <Route path="/register" element={<Register />} />
    </Routes>
  );
}
