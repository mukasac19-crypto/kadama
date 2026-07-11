import { waTrackedHref } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";
import { WhatsAppIcon } from "./WhatsAppButton";

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  return (
    <a
      href={waTrackedHref({ src: "floating", lang: locale })}
      target="_blank"
      rel="noopener"
      aria-label={
        locale === "ar"
          ? "تحدث مع ميد لينك على واتساب"
          : "Chat with Maid Link on WhatsApp"
      }
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
