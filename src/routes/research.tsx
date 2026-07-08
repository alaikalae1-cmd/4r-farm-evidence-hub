import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_RESEARCH } from "@/lib/sample-data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Riset — 4R Farm" },
      {
        name: "description",
        content:
          "Metode, desain studi, dan uji lapangan di balik data 4R Farm.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="container-page py-10 max-w-3xl">
          <span className="badge-evidence">STEP 4 · RISET</span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3">
            Metode di balik angka
          </h1>
          <p className="text-muted-foreground mt-2">
            Data hanya sekuat metode yang menghasilkannya. Di sini kami mencatat desain
            studi, periode uji, dan Evidence Record yang terkait.
          </p>
        </div>
      </section>

      <section className="container-page py-10 space-y-5">
        {SAMPLE_RESEARCH.map((r) => (
          <article key={r.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="badge-evidence">{r.id}</span>
              <span className="text-xs font-mono text-muted-foreground">{r.status}</span>
            </div>
            <h2 className="font-serif text-xl mt-3">{r.title}</h2>
            <dl className="mt-3 text-sm grid gap-2 md:grid-cols-[8rem_1fr]">
              <dt className="text-muted-foreground">Periode</dt>
              <dd className="font-mono">{r.period}</dd>
              <dt className="text-muted-foreground">Metode</dt>
              <dd>{r.method}</dd>
              <dt className="text-muted-foreground">Evidence terkait</dt>
              <dd className="flex flex-wrap gap-1.5">
                {r.linked_evidence.length === 0 ? (
                  <span className="text-muted-foreground text-xs">
                    Belum ada — studi masih berjalan.
                  </span>
                ) : (
                  r.linked_evidence.map((e) => (
                    <span key={e} className="badge-evidence">
                      {e}
                    </span>
                  ))
                )}
              </dd>
            </dl>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
