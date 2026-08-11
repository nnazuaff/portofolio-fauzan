import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-[#0d1117] px-5 text-slate-100">
      <div className="w-full max-w-3xl border-y border-white/10 py-16">
        <Terminal size={28} strokeWidth={1.7} className="text-[#17cbb3]" />
        <p className="mt-10 font-mono text-sm text-[#17cbb3]">
          404 / route_not_found
        </p>
        <h1 className="mt-4 max-w-xl text-balance text-5xl font-semibold leading-none tracking-[-0.05em] md:text-7xl">
          Halaman ini tidak tersedia.
        </h1>
        <p className="mt-6 max-w-lg text-pretty leading-7 text-slate-400">
          Alamat mungkin berubah atau halaman sudah dipindahkan. Kembali ke
          portofolio utama untuk melanjutkan.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 bg-[#17cbb3] px-5 py-3 text-sm font-semibold text-[#0d1117] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px"
        >
          <ArrowLeft size={16} strokeWidth={2} /> Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
