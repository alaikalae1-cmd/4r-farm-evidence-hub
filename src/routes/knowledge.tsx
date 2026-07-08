import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_ARTICLES } from "@/lib/sample-data";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge — 4R Farm" },
      {
        name: "description",
        content:
          "Artikel edukasi konsumen. Setiap artikel merujuk pada Evidence Record dan mencantumkan metadata review.",
      },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="container-page py-10 max-w-3xl">
          <span className="badge-evidence">STEP 3 · KNOWLEDGE</span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3">
            Pahami angka di balik label
          </h1>
          <p className="text-muted-foreground mt-2">
            Artikel di sini merujuk langsung ke Evidence ID. Setiap artikel mencantumkan
            siapa yang menulis draft, siapa yang mereview, dan kapan direview.
          </p>
        </div>
      </section>

      <section className="container-page py-10 grid gap-5 md:grid-cols-2">
        {SAMPLE_ARTICLES.map((a) => (
          <article
            key={a.slug}
            className="rounded-lg border border-border bg-card p-6 flex flex-col"
          >
            <h2 className="font-serif text-xl leading-snug">{a.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{a.excerpt}</p>

            <dl className="mt-4 text-xs grid grid-cols-2 gap-y-1 gap-x-4">
              <dt className="text-muted-foreground">Draft oleh</dt>
              <dd>{a.author_type}</dd>
              <dt className="text-muted-foreground">Direview oleh</dt>
              <dd>{a.reviewed_by}</dd>
              <dt className="text-muted-foreground">Tanggal review</dt>
              <dd className="font-mono">{a.reviewed_at}</dd>
              <dt className="text-muted-foreground">Status</dt>
              <dd>
                <span className="badge-evidence">{a.status}</span>
              </dd>
            </dl>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">Merujuk evidence:</div>
              <div className="flex flex-wrap gap-1.5">
                {a.references.map((r) => (
                  <span key={r} className="badge-evidence">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
