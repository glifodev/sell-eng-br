import { ImageResponse } from "next/og";
import { S_BOTTOM, S_TOP, S_WAVE } from "@/components/brand/Logo";

export const dynamic = "force-static";

export const alt = "SELL Engenharia e Logística — Engenharia naval, portuária e mecânica em São Luís/MA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(160deg, #13263a 0%, #07111c 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="236" height="85" viewBox="4 3 94 34" fill="none">
          <g stroke="#ffffff" strokeWidth="4.5">
            <path d={S_TOP} strokeLinejoin="round" />
            <path d={S_BOTTOM} strokeLinejoin="round" />
            <path d="M58 7 H42.25 V33 H58" />
            <path d="M42 20 H54" />
            <path d="M66.25 4.75 V33 H80" />
            <path d="M84.25 4.75 V33 H98" />
          </g>
          <path d={S_WAVE} stroke="#f2a900" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>Engenharia naval, portuária e mecânica.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
            São Luís · MA — Norte & Nordeste · sell.eng.br
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#f2a900" }} />
      </div>
    ),
    size,
  );
}
