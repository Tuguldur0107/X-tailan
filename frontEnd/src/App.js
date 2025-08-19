import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("landing");

  const goLogin = () => setPage("login");
  const goDashboard = () => setPage("dashboard");
  const goLanding = () => setPage("landing");

  return (
    <div>
      {page === "landing" && <LandingPage onLogin={goLogin} />}
      {page === "login" && <Login onSuccess={goDashboard} onBack={goLanding} />}
      {page === "dashboard" && <Dashboard onLogout={goLanding} />}
    </div>
  );
}

export default App;
