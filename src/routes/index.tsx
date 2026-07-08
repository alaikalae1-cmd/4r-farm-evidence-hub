import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_EVIDENCE } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "4R Farm — Peternakan Berbasis Bukti" },
      {
        name: "description",
        content:
          "Kami tidak menjual klaim. Kami menerbitkan hasil lab. Verifikasi batch telur Omega-3 4R Farm secara langsung.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const latest = SAMPLE_EVIDENCE.filter((e) => e.status !== "Superseded")
    .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))
    .slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-page py-16 md:py-24 max-w-3xl">
          <span className="badge-evidence">EVIDENCE-BASED · SAMPLE DATA</span>
          <h1 className="mt-5 text-4xl md:text-5xl font-semibold leading-tight">
            Kami tidak meminta Anda percaya.
            <br />
            <span className="text-primary">Kami menunjukkan buktinya.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Setiap angka gizi pada produk 4R Farm punya nomor laporan lab yang
            dapat Anda verifikasi sendiri — tanpa login, tanpa dipilih-pilih.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/verification"
              className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:bg-primary/90"
            >
              Verifikasi kode batch
            </Link>
            <Link
              to="/dataset"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 font-medium hover:bg-secondary"
            >
              Lihat dataset lengkap
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { k: SAMPLE_EVIDENCE.length, v: "Evidence Records" },
            { k: "2", v: "Laboratorium Terakreditasi KAN" },
            { k: "100%", v: "PDF Asli Terlampir" },
            { k: "Append-only", v: "Riwayat tidak dihapus" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-serif text-2xl md:text-3xl text-primary">{s.k}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest evidence */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Hasil uji terbaru</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Versi terbaru per parameter. Riwayat lengkap ada di halaman Dataset.
            </p>
          </div>
          <Link to="/dataset" className="text-sm text-primary hover:underline shrink-0">
            Semua data →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((e) => (
            <article
              key={e.evidence_id}
              className="rounded-lg border border-border bg-card p-5 flex flex-col"
            >
              <span className="badge-evidence self-start">{e.evidence_id}</span>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground">{e.parameter}</div>
                <div className="font-serif text-3xl mt-1">
                  {e.value}
                  <span className="text-base text-muted-foreground font-sans ml-1">
                    {e.unit}
                  </span>
                </div>
              </div>
              <dl className="mt-4 text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between gap-2">
                  <dt>Batch</dt>
                  <dd className="font-mono text-foreground">{e.product_batch}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Metode</dt>
                  <dd className="text-foreground">{e.method}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Lab</dt>
                  <dd className="text-foreground text-right">{e.report.laboratory_name}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Laporan</dt>
                  <dd className="font-mono text-foreground">{e.report.report_number}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Perjalanan */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-page py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Bagaimana kepercayaan dibangun</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Urutan halaman mengikuti perjalanan konsumen: dari ragu, mencari bukti,
            memverifikasi, hingga memahami prosesnya.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { n: 1, t: "Verifikasi", d: "Masukkan kode batch pada kemasan. Lihat evidence-nya.", to: "/verification" as const },
              { n: 2, t: "Dataset", d: "Semua hasil uji, semua batch, semua versi.", to: "/dataset" as const },
              { n: 3, t: "Knowledge", d: "Panduan membaca angka dan satuan lab.", to: "/knowledge" as const },
              { n: 4, t: "Riset", d: "Metode dan studi lapangan di balik data.", to: "/research" as const },
              { n: 5, t: "Pengakuan", d: "Sertifikasi & akreditasi pihak ketiga.", to: "/recognition" as const },
            ].map((s) => (
              <li key={s.n} className="rounded-lg border border-border bg-card p-5">
                <div className="font-mono text-xs text-muted-foreground">STEP {s.n}</div>
                <Link to={s.to} className="font-serif text-xl mt-1 block hover:text-primary">
                  {s.t}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
