import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl font-black text-brand-200">404</p>
      <h1 className="mt-4 text-xl font-bold">
        Page not found · الصفحة غير موجودة
      </h1>
      <div className="mt-6 flex justify-center gap-3 text-sm font-semibold">
        <Link href="/en" className="rounded-full bg-brand-700 px-5 py-2.5 text-white hover:bg-brand-800">
          Back home
        </Link>
        <Link href="/ar" className="rounded-full border border-brand-700 px-5 py-2.5 text-brand-800 hover:bg-brand-50">
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
