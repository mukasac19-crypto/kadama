import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "./og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Maid Link — Hire trusted maids & nannies across the UAE";

export default function Image() {
  return ogImage();
}
