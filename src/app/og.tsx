import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

/** Shared 1200x630 social card used by opengraph-image and twitter-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0f766e 0%, #115e59 55%, #134e4a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800 }}>
          <span>Maid</span>
          <span style={{ marginLeft: 10, color: "#fcd34d" }}>Link</span>
          <span
            style={{
              marginLeft: 12,
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#fcd34d",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Hire trusted maids &amp; nannies across the UAE
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#ccfbf1" }}>
            Full-time · Maid visa · Part-time · Nannies
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#a7f3d0" }}>
          MOHRE-licensed · {SITE.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
