"use client";

import { useEffect } from "react";

export default function GlobalErrorRoot({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="id">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f5f6f7",
          fontFamily: "-apple-system, 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "24px", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>
            S-One Gym sedang bermasalah
          </h1>
          <p style={{ color: "#9a9da3", marginBottom: "24px", lineHeight: 1.6 }}>
            Aplikasi gagal dimuat sepenuhnya. Silakan muat ulang halaman.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, hsl(195 100% 50%), hsl(264 76% 53%))",
              color: "#0a0a0a",
              fontWeight: 700,
              border: "none",
              borderRadius: "10px",
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Muat Ulang
          </button>
        </div>
      </body>
    </html>
  );
}
