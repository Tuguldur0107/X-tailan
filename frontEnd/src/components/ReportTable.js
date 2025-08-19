import React from "react";

function ReportTable() {
  const reports = [
    { id: 1, name: "2025-07 X тайлан", status: "Илгээгдсэн" },
    { id: 2, name: "2025-08 X тайлан", status: "Хүлээгдэж байна" }
  ];

  return (
    <table border="1" width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>№</th>
          <th>Тайлан</th>
          <th>Статус</th>
          <th>Үйлдэл</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r, i) => (
          <tr key={r.id}>
            <td>{i + 1}</td>
            <td>{r.name}</td>
            <td>{r.status}</td>
            <td>
              <button>Илгээх</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
