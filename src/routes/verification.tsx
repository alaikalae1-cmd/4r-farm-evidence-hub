import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_EVIDENCE } from "@/lib/sample-data";

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: "Verifikasi Batch — 4R Farm" },
      {
        name: "description",
        content:
          "Verifikasi kode batch produk 4R Farm untuk melihat evidence lab yang menyertainya.",
      },
    ],
  }),
  component: VerificationPage,
});

function VerificationPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const results = submitted
    ? SAMPLE_EVIDENCE.filter(
        (e) => e.product_batch.toLowerCase() === submitted.trim().toLowerCase(),
      )
    : [];

  const sampleBatches = Array.from(
    new Set(SAMPLE_EVIDENCE.map((e) => e.product_batch)),
  );

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="container-page py-12 max-w-3xl">
          <span className="badge-evidence">STEP 1 · VERIFIKASI</span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-4">
            Verifikasi kode batch
          </h1>
          <p className="text-muted-foreground mt-2">
            Kode batch dicetak pada kemasan telur. Masukkan di bawah untuk melihat
            evidence lab yang dilampirkan untuk batch tersebut.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(query);
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: BATCH-2026-04-C"
              className="flex-1 rounded-md border border-input bg-card px-4 py-2.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-md bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:bg-primary/90"
            >
              Verifikasi
            </button>
          </form>

          <div className="mt-3 text-xs text-muted-foreground">
            Coba contoh:{" "}
            {sampleBatches.map((b, i) => (
              <button
                key={b}
                onClick={() => {
                  setQuery(b);
                  setSubmitted(b);
                }}
                className="font-mono text-primary hover:underline"
              >
                {b}
                {i < sampleBatches.length - 1 ? ", " : ""}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        {submitted === null && (
          <EmptyState
            title="Belum ada batch diverifikasi"
            desc="Masukkan kode batch di atas untuk melihat evidence terkait."
          />
        )}
        {submitted !== null && results.length === 0 && (
          <div className="rounded-lg border border-warning/40 bg-warning/10 p-6">
            <div className="font-medium">Batch tidak ditemukan</div>
            <p className="text-sm text-muted-foreground mt-1">
              Kode <span className="font-mono">{submitted}</span> tidak terdaftar di
              dataset SAMPLE kami. Periksa penulisan atau lihat{" "}
              <Link to="/dataset" className="text-primary underline">
                seluruh dataset
              </Link>
              .
            </p>
          </div>
        )}
        {results.length > 0 && (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Menampilkan {results.length} evidence untuk batch{" "}
              <span className="font-mono text-foreground">{submitted}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((e) => (
                <EvidenceCard key={e.evidence_id} e={e} />
              ))}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border p-10 text-center">
      <div className="font-serif text-lg">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

export function EvidenceCard({ e }: { e: (typeof SAMPLE_EVIDENCE)[number] }) {
  return (
    <article className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="badge-evidence">{e.evidence_id}</span>
        <StatusPill status={e.status} />
      </div>
      <h3 className="font-serif text-xl mt-3">{e.parameter}</h3>
      <div className="font-serif text-3xl mt-1">
        {e.value}
        <span className="text-base text-muted-foreground font-sans ml-1">{e.unit}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <Field label="Produk" value={e.product_name} />
        <Field label="Batch" value={e.product_batch} mono />
        <Field label="Metode" value={e.method} />
        <Field label="Uji" value={e.tested_date} />
        <Field label="Lab" value={e.report.laboratory_name} />
        <Field label="Akreditasi" value={e.report.laboratory_accreditation} mono />
        <Field label="Nomor Laporan" value={e.report.report_number} mono />
        <Field label="SHA-256 PDF" value={e.report.pdf_sha256} mono />
      </dl>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <a
          href={e.report.pdf_url}
          className="rounded-md border border-border px-2.5 py-1.5 hover:bg-secondary"
        >
          Lihat PDF laporan
        </a>
        <span className="rounded-md bg-secondary text-secondary-foreground px-2.5 py-1.5 font-mono">
          v{e.version_number}
          {e.supersedes_evidence_id && ` · menggantikan ${e.supersedes_evidence_id}`}
        </span>
      </div>
    </article>
  );
}

function Field({ label, value, mono }: { label: string; value: string | number; mono?: boolean }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono" : ""}>{value}</dd>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    Published: "bg-success/15 text-success",
    Referenced: "bg-primary/15 text-primary",
    Verified: "bg-warning/20 text-warning-foreground",
    Superseded: "bg-muted text-muted-foreground line-through",
    Created: "bg-muted text-muted-foreground",
    Archived: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${tone[status] ?? "bg-muted"}`}
    >
      {status}
    </span>
  );
}
