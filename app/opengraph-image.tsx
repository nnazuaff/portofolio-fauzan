import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fauzan Zhahir Arrafi, Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", color: "#17cbb3", fontSize: 24 }}>
        FULL STACK WEB DEVELOPER / BANDUNG
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            maxWidth: 960,
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: "-4px",
            lineHeight: 0.95,
          }}
        >
          Fauzan Zhahir Arrafi
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 28,
            color: "#8b98a5",
          }}
        >
          Laravel · Livewire · Tailwind CSS · MySQL
        </div>
      </div>
      <div
        style={{ display: "flex", width: 80, height: 8, background: "#17cbb3" }}
      />
    </div>,
    size,
  );
}
