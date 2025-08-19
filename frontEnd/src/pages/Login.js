import React, { useState } from "react";

function Login({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Одоогоор API холбохгүй, шууд login хийсэн гэж үзнэ
    if (email && pass) {
      onSuccess();
    } else {
      alert("Email ба нууц үгээ оруулна уу");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Нэвтрэх</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="И-мэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Нууц үг"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        /><br /><br />
        <button type="submit">Нэвтрэх</button>
      </form>
      <br />
      <button onClick={onBack}>Буцах</button>
    </div>
  );
}

export default Login;
