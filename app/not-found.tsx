import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found"><div>
      <p className="section-label"><span>404</span> Sedikit keluar jalur</p>
      <h1>Halaman ini tidak tersedia.</h1>
      <p className="mt-5">Alamat mungkin berubah atau halaman sudah dipindahkan. Kembali ke portofolio utama untuk melanjutkan.</p>
      <Link href="/" className="button button-primary"><ArrowLeft size={15} aria-hidden="true" />Kembali ke beranda</Link>
    </div></main>
  );
}
