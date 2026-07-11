import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Tracked WhatsApp redirect. Every WhatsApp button on the site points here;
 * we log the click (maid, source, user) and forward to wa.me with a
 * pre-filled message that carries the maid's profile code — the message
 * itself is what ties a chat back to a listing and its agency.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("maid");
  const src = searchParams.get("src") ?? "unknown";
  const arabic = searchParams.get("lang") === "ar";

  let message = arabic
    ? `مرحباً ${SITE.name}! أبحث عن عاملة منزلية. هل يمكنكم مساعدتي؟`
    : `Hi ${SITE.name}! I'm looking for a domestic helper. Can you help?`;
  if (src === "agency") {
    message = arabic
      ? `مرحباً ${SITE.name}، أدير وكالة استقدام وأرغب في عرض عاملاتي على منصتكم.`
      : `Hello ${SITE.name}, I run a recruitment agency and would like to list my maids on your platform.`;
  }

  let maidId: string | null = null;

  try {
    const admin = createAdminClient();

    if (code) {
      const { data: maid } = await admin
        .from("maids")
        .select("id, code, full_name, nationality")
        .eq("code", code)
        .maybeSingle();
      if (maid) {
        maidId = maid.id;
        const firstName = maid.full_name.split(" ")[0];
        message = arabic
          ? `مرحباً ${SITE.name}! أنا مهتم بـ ${firstName} (#${maid.code}). هل ما زالت متاحة؟`
          : `Hi ${SITE.name}! I'm interested in ${firstName} (#${maid.code}), ${maid.nationality}. Is she still available?`;
      }
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await admin.from("wa_clicks").insert({
      maid_id: maidId,
      user_id: user?.id ?? null,
      src,
      path: request.headers.get("referer"),
    });
  } catch {
    // Tracking must never block the chat from opening.
  }

  return NextResponse.redirect(
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`,
    { status: 307 }
  );
}
