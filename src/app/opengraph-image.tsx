import { ImageResponse } from "next/og";
import { LOCKUP, MARK_BANDS, WORD_CLIP, WORD_PATH } from "@/components/brand/Logo";

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
          background: "linear-gradient(160deg, #0b2c63 0%, #031330 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="292" height="80" viewBox={LOCKUP.viewBox}>
          <defs>
            <clipPath id="w">
              <path d={WORD_CLIP} />
            </clipPath>
          </defs>
          <g transform={LOCKUP.markTransform}>
            {MARK_BANDS.map((d, i) => (
              <path key={i} d={d} fill={["#2ac0ea", "#9fcdf2", "#ffffff"][i]} />
            ))}
          </g>
          <path d={WORD_PATH} transform={`translate(${LOCKUP.wordX} 0)`} clipPath="url(#w)" fill="#ffffff" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>Engenharia naval, portuária e mecânica.</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
            São Luís · MA — Norte & Nordeste · sell.eng.br
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#2ac0ea" }} />
      </div>
    ),
    size,
  );
}
