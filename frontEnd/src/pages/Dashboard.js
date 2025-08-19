import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ReportTable from "../components/ReportTable";

function Dashboard({ onLogout }) {
  const [page, setPage] = useState("dashboard");

  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div style={{ display: "flex" }}>
        <Sidebar onNavigate={setPage} />

        <main style={{ flex: 1, padding: "20px" }}>
          {page === "dashboard" && (
            <div>
              <h2>Тайлангийн самбар</h2>
              <div style={{ display: "flex" }}>
                <DashboardCard title="Нийт компани" value="5" />
                <DashboardCard title="Илгээгдсэн тайлан" value="12" />
                <DashboardCard title="Хүлээгдэж буй тайлан" value="3" />
              </div>
            </div>
          )}

          {page === "reports" && (
            <div>
              <h2>Тайлангийн жагсаалт</h2>
              <ReportTable />
            </div>
          )}

          {page === "companies" && (
            <div>
              <h2>Компаниуд</h2>
              <button>+ Шинэ компани нэмэх</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
