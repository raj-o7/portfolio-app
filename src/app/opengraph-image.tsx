import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0c10",
          color: "#ece8de",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9a92ff", letterSpacing: 4, marginBottom: 24 }}>
          {"// " + profile.title.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 600, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 30, color: "#9298a6", marginTop: 28, maxWidth: 900 }}>
          {profile.positioning.length > 140 ? profile.positioning.slice(0, 137) + "..." : profile.positioning}
        </div>
      </div>
    ),
    { ...size }
  );
}
