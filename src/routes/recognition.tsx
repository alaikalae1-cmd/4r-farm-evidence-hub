import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_RECOGNITION } from "@/lib/sample-data";

export const Route = createFileRoute("/recognition")({
  head: () => ({
    meta: [
      { title: "Pengakuan — 4R Farm" },
      {
        name: "description",
        content:
          "Sertifikasi, akreditasi laboratorium mitra, dan liputan pihak ketiga.",
      },
    ],
  }),
  component: RecognitionPage,
});

function RecognitionPage() {
  const byType = SAMPLE_RECOGNITION.reduce<Record<string, typeof SAMPLE_RECOGNITION>>(
    (acc, r) => {
      (acc[r.type] ||= []).push(r);
      return acc;
    },
    {},
  );

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="container-page py-10 max-w-3xl">
          <span className="badge-evidence">STEP 5 · PENGAKUAN</span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3">
            Diakui oleh pihak ketiga
          </h1>
          <p className="text-muted-foreground mt-2">
            Kepercayaan bukan klaim sendiri. Berikut sertifikasi, akreditasi lab
            mitra, dan liputan independen yang dapat diverifikasi.
          </p>
        </div>
      </section>

      <section className="container-page py-10 space-y-10">
        {Object.entries(byType).map(([type, items]) => (
          <div key={type}>
            <h2 className="font-serif text-xl mb-3">{type}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((r) => (
                <a
                  key={r.title}
                  href={r.verify_url}
                  className="rounded-lg border border-border bg-card p-5 hover:border-primary transition-colors block"
                >
                  <div className="text-xs font-mono text-muted-foreground">{r.date}</div>
                  <div className="font-medium mt-1">{r.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Diterbitkan oleh {r.issuer}
                  </div>
                  <div className="text-xs text-primary mt-3">Verifikasi →</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
