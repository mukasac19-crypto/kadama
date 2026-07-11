import { createClient } from "@/lib/supabase/server";
import { MaidForm } from "@/components/admin/MaidForm";
import type { Agency } from "@/lib/types";

export default async function NewMaidPage() {
  const supabase = await createClient();
  const { data: agencies } = await supabase.from("agencies").select("*").order("name");

  return (
    <div>
      <h2 className="text-lg font-bold">Add a maid</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Copy the details from the agency&apos;s WhatsApp message. Save as{" "}
        <strong>draft</strong> first — you can add photos on the next screen, then
        publish.
      </p>
      <div className="mt-6">
        <MaidForm agencies={(agencies ?? []) as Agency[]} />
      </div>
    </div>
  );
}
