import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { SAMPLE_EVIDENCE } from "@/lib/sample-data";
import { EvidenceCard, StatusPill } from "./verification";

export const Route = createFileRoute("/dataset")({
  head: () => ({
    meta: [
      { title: "Dataset Publik — 4R Farm" },
      {
        name: "description",
        content:
          "Seluruh Evidence Record 4R Farm — semua parameter, semua batch, semua versi. Append-only.",
      },
    ],
  }),
  component: DatasetPage,
});

function DatasetPage() {
  const [showHistory, setShowHistory] = useState(false);
  const [param, setParam] = useState<string>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const parameters = useMemo(
    () => Array.from(new Set(SAMPLE_EVIDENCE.map((e) => e.parameter))),
    [],
  );

  const rows = useMemo(() => {
    let list = [...SAMPLE_EVIDENCE];
    if (!showHistory) {
      // latest per lineage
      const byLineage = new Map<string, (typeof SAMPLE_EVIDENCE)[number]>();
      for (const e of list) {
        const cur = byLineage.get(e.lineage_id);
        if (!cur || cur.version_number < e.version_number) byLineage.set(e.lineage_id, e);
      }
      list = Array.from(byLineage.values());
    }
    if (param !== "all") list = list.filter((e) => e.parameter === param);
    return list.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  }, [showHistory, param]);

  const selectedRecord = selected
    ? SAMPLE_EVIDENCE.find((e) => e.evidence_id === selected)
    : null;

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="container-page py-10">
          <span className="badge-evidence">STEP 2 · DATASET PUBLIK</span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-3">
            Semua hasil uji, tanpa dipilih
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Default menampilkan versi terbaru per parameter. Aktifkan riwayat untuk
            melihat evidence yang sudah digantikan — tidak ada yang dihapus.
          </p>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label className="text-sm text-muted-foreground">Parameter:</label>
          <select
            value={param}
            onChange={(e) => setParam(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-1.5 text-sm"
          >
            <option value="all">Semua parameter</option>
            {parameters.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <label className="ml-auto inline-flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showHistory}
              onChange={(e) => setShowHistory(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--primary)]"
            />
            Lihat Riwayat Pengujian
          </label>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2.5">Evidence ID</th>
                <th className="px-3 py-2.5">Parameter</th>
                <th className="px-3 py-2.5 text-right">Nilai</th>
                <th className="px-3 py-2.5">Batch</th>
                <th className="px-3 py-2.5">Uji</th>
                <th className="px-3 py-2.5">Laporan Lab</th>
                <th className="px-3 py-2.5">Ver</th>
                <th className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr
                  key={e.evidence_id}
                  onClick={() => setSelected(e.evidence_id)}
                  className="border-t border-border cursor-pointer hover:bg-secondary/40"
                >
                  <td className="px-3 py-2.5 font-mono text-xs">{e.evidence_id}</td>
                  <td className="px-3 py-2.5">{e.parameter}</td>
                  <td className="px-3 py-2.5 text-right font-mono">
                    {e.value} <span className="text-muted-foreground">{e.unit}</span>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs">{e.product_batch}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{e.tested_date}</td>
                  <td className="px-3 py-2.5 font-mono text-xs">{e.report.report_number}</td>
                  <td className="px-3 py-2.5 font-mono text-xs">v{e.version_number}</td>
                  <td className="px-3 py-2.5">
                    <StatusPill status={e.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">
                    Tidak ada baris untuk filter ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Klik baris untuk melihat detail evidence. Semua data adalah SAMPLE.
        </p>

        {selectedRecord && (
          <div className="mt-6 max-w-2xl">
            <EvidenceCard e={selectedRecord} />
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
