import React from "react";

function Navbar({ onLogout }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "#222",
      color: "white"
    }}>
      <h2>X-tailan Admin</h2>
      <button onClick={onLogout} style={{
        background: "red",
        color: "white",
        border: "none",
        padding: "5px 10px",
        cursor: "pointer"
      }}>Гарах</button>
    </nav>
  );
}

export default Navbar;
