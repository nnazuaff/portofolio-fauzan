import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grain grid min-h-[100dvh] place-items-center bg-paper px-5 text-ink">
      <div className="paper-card relative w-full max-w-3xl -rotate-1 rounded-[2.5rem_1.2rem_2rem_1.5rem] bg-sun p-8 md:p-14">
        <span aria-hidden="true" className="tape-strip -top-4 right-12 rotate-3" />
        <span className="grid h-12 w-12 place-items-center rounded-full bg-tosca text-ink">
          <Terminal size={25} strokeWidth={2} aria-hidden="true" />
        </span>
        <p className="mt-10 font-mono text-sm font-semibold text-tosca-dark">
          404 / route_not_found
        </p>
        <h1 className="mt-4 max-w-xl text-balance font-display text-5xl font-bold leading-none tracking-[-0.03em] md:text-7xl">
          Halaman ini tidak tersedia.
        </h1>
        <p className="mt-6 max-w-lg text-pretty leading-7 text-ink/65">
          Alamat mungkin berubah atau halaman sudah dipindahkan. Kembali ke
          portofolio utama untuk melanjutkan.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-tosca px-6 py-3 font-display text-sm font-bold text-ink print-shadow transition-transform hover:-translate-y-0.5 active:translate-y-px motion-reduce:transition-none"
        >
          <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" /> Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
