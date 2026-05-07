import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 64,
        background:
          "linear-gradient(135deg, #0b0b10 0%, #0f172a 40%, #111827 100%)",
        color: "white",
      }}
    >
      <div style={{ fontSize: 22, opacity: 0.85 }}>LeadForge AI</div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.05,
          marginTop: 14,
        }}
      >
        Smart local lead discovery
      </div>
      <div
        style={{ fontSize: 28, opacity: 0.85, marginTop: 22, maxWidth: 900 }}
      >
        Find businesses with visible problems and turn them into clients.
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
        {["Discovery", "Scoring", "Outreach"].map((x) => (
          <div
            key={x}
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 18,
            }}
          >
            {x}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
