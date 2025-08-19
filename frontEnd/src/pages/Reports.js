import React from "react";
import ReportTable from "../components/ReportTable";

function Reports() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Тайлангийн жагсаалт</h2>
      <p>Та хүссэн тайлангаа сонгож илгээх боломжтой.</p>
      <ReportTable />
    </div>
  );
}

export default Reports;
