import React from "react";

function Sidebar({ onNavigate }) {
  return (
    <aside style={{
      width: "200px",
      background: "#f0f0f0",
      padding: "20px",
      height: "100vh"
    }}>
      <h3>Меню</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><button onClick={() => onNavigate("dashboard")}>Нүүр</button></li>
        <li><button onClick={() => onNavigate("reports")}>Тайлан</button></li>
        <li><button onClick={() => onNavigate("companies")}>Компаниуд</button></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
