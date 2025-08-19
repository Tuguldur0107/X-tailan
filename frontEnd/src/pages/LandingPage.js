import React from "react";

function LandingPage({ onLogin }) {
  return (
    <main style={{ background: "#f9fafb", color: "#111827" }}>
      
      {/* Hero Section */}
      <section style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        background: "linear-gradient(to bottom right, #eff6ff, #ffffff, #ecfdf5)"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.8)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          maxWidth: "800px"
        }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "20px", lineHeight: "1.2" }}>
            X тайлангаа март,
            <br />
            <span style={{ color: "#1d4ed8" }}>X-SENDER-ийг ажиллуул</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "24px" }}>
            Таны өмнөөс X тайланг хуулийн хугацаанд автоматаар илгээнэ
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            <a
              href="https://www.facebook.com/profile.php?id=61578621497518"
              style={{
                padding: "12px 24px",
                background: "#2563eb",
                color: "white",
                fontWeight: "600",
                borderRadius: "8px",
                textDecoration: "none"
              }}
            >
              Facebook Page
            </a>
            <button
              onClick={onLogin}
              style={{
                padding: "12px 24px",
                border: "2px solid #2563eb",
                color: "#2563eb",
                fontWeight: "600",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer"
              }}
            >
              Системд нэвтрэх
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: "80px 20px", background: "white" }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.8)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", textAlign: "center", marginBottom: "20px" }}>
            X-SENDER гэж юу вэ?
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify", color: "#374151" }}>
            <strong style={{ color: "#1d4ed8" }}>X-SENDER</strong> нь Монголын ААН-үүдийн Х тайланг –
            тухайн хугацаанд орлого, үйл ажиллагаа байхгүй гэдгийг мэдүүлдэг тайланг – 
            <strong> албан ёсны eTax API</strong> ашиглан автоматаар, алдаагүй, хугацаанд нь илгээх платформ юм.
            Энэхүү систем нь тайлан илгээх процессыг бүрэн автоматжуулж,
            <span style={{ color: "#16a34a", fontWeight: "500" }}> гар ажиллагаа, марталт, алдааг арилгах</span> зорилготой.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
