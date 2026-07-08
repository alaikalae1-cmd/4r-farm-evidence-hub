// Sample evidence data for 4R Farm — clearly marked as SAMPLE.
// Follows Evidence Record Schema v1.1 (append-only, immutable once published).

export type EvidenceStatus =
  | "Created"
  | "Verified"
  | "Published"
  | "Referenced"
  | "Superseded"
  | "Archived";

export interface LaboratoryReport {
  report_id: string;
  report_number: string;
  laboratory_name: string;
  laboratory_accreditation: string;
  issued_date: string;
  pdf_url: string;
  pdf_sha256: string;
}

export interface EvidenceRecord {
  evidence_id: string; // permanent citable ID
  lineage_id: string;
  version_number: number;
  supersedes_evidence_id: string | null;
  product_name: string;
  product_batch: string;
  parameter: string;
  value: number;
  unit: string;
  method: string;
  sampling_date: string;
  tested_date: string;
  published_at: string;
  status: EvidenceStatus;
  report: LaboratoryReport;
  notes?: string;
}

const reportA: LaboratoryReport = {
  report_id: "lab-2025-001",
  report_number: "LAB/IPB/2025/00142",
  laboratory_name: "Laboratorium Pengujian Pangan IPB (SAMPLE)",
  laboratory_accreditation: "KAN LP-XXX-IDN",
  issued_date: "2025-11-14",
  pdf_url: "#sample-pdf-a",
  pdf_sha256: "a1b2c3d4e5f6…sample",
};

const reportB: LaboratoryReport = {
  report_id: "lab-2026-007",
  report_number: "LAB/SUCOFINDO/2026/00318",
  laboratory_name: "Sucofindo Laboratorium (SAMPLE)",
  laboratory_accreditation: "KAN LP-YYY-IDN",
  issued_date: "2026-05-02",
  pdf_url: "#sample-pdf-b",
  pdf_sha256: "f6e5d4c3b2a1…sample",
};

export const SAMPLE_EVIDENCE: EvidenceRecord[] = [
  {
    evidence_id: "EV-2025-0001",
    lineage_id: "LN-OMEGA3-TELUR",
    version_number: 1,
    supersedes_evidence_id: null,
    product_name: "Telur Omega-3 4R Farm",
    product_batch: "BATCH-2025-11-A",
    parameter: "Omega-3 (total)",
    value: 312,
    unit: "mg / 100g",
    method: "AOAC 991.39 (GC-FID)",
    sampling_date: "2025-11-01",
    tested_date: "2025-11-10",
    published_at: "2025-11-15",
    status: "Referenced",
    report: reportA,
  },
  {
    evidence_id: "EV-2025-0002",
    lineage_id: "LN-DHA-TELUR",
    version_number: 1,
    supersedes_evidence_id: null,
    product_name: "Telur Omega-3 4R Farm",
    product_batch: "BATCH-2025-11-A",
    parameter: "DHA",
    value: 128,
    unit: "mg / 100g",
    method: "AOAC 991.39 (GC-FID)",
    sampling_date: "2025-11-01",
    tested_date: "2025-11-10",
    published_at: "2025-11-15",
    status: "Published",
    report: reportA,
  },
  {
    evidence_id: "EV-2026-0014",
    lineage_id: "LN-OMEGA3-TELUR",
    version_number: 2,
    supersedes_evidence_id: "EV-2025-0001",
    product_name: "Telur Omega-3 4R Farm",
    product_batch: "BATCH-2026-04-C",
    parameter: "Omega-3 (total)",
    value: 341,
    unit: "mg / 100g",
    method: "AOAC 991.39 (GC-FID)",
    sampling_date: "2026-04-18",
    tested_date: "2026-04-28",
    published_at: "2026-05-05",
    status: "Published",
    report: reportB,
    notes: "Formulasi pakan diperbarui — kadar meningkat 9%.",
  },
  {
    evidence_id: "EV-2026-0015",
    lineage_id: "LN-DHA-TELUR",
    version_number: 2,
    supersedes_evidence_id: "EV-2025-0002",
    product_name: "Telur Omega-3 4R Farm",
    product_batch: "BATCH-2026-04-C",
    parameter: "DHA",
    value: 142,
    unit: "mg / 100g",
    method: "AOAC 991.39 (GC-FID)",
    sampling_date: "2026-04-18",
    tested_date: "2026-04-28",
    published_at: "2026-05-05",
    status: "Published",
    report: reportB,
  },
  {
    evidence_id: "EV-2026-0016",
    lineage_id: "LN-SALMONELLA-TELUR",
    version_number: 1,
    supersedes_evidence_id: null,
    product_name: "Telur Omega-3 4R Farm",
    product_batch: "BATCH-2026-04-C",
    parameter: "Salmonella spp.",
    value: 0,
    unit: "cfu / 25g (negatif)",
    method: "SNI ISO 6579-1:2017",
    sampling_date: "2026-04-18",
    tested_date: "2026-04-29",
    published_at: "2026-05-05",
    status: "Published",
    report: reportB,
  },
];

export const SAMPLE_ARTICLES = [
  {
    slug: "apa-itu-omega-3-dan-mengapa-penting",
    title: "Apa itu Omega-3 dan mengapa penting bagi tubuh?",
    excerpt:
      "Penjelasan ringkas tentang Omega-3, jenis-jenisnya (ALA, EPA, DHA), dan bagaimana angka pada label telur harus dibaca.",
    author_type: "AI-drafted, human-reviewed",
    reviewed_by: "Tim Riset 4R Farm",
    reviewed_at: "2026-05-10",
    status: "Approved",
    references: ["EV-2026-0014", "EV-2026-0015"],
  },
  {
    slug: "bagaimana-cara-membaca-hasil-uji-lab",
    title: "Bagaimana cara membaca hasil uji laboratorium?",
    excerpt:
      "Panduan konsumen untuk memahami satuan mg/100g, metode AOAC, dan mengapa nomor laporan lab itu penting.",
    author_type: "Human-drafted",
    reviewed_by: "Founder",
    reviewed_at: "2026-04-02",
    status: "Approved",
    references: ["EV-2025-0001"],
  },
  {
    slug: "mengapa-batch-berbeda-hasilnya-berbeda",
    title: "Mengapa hasil uji antar batch bisa berbeda?",
    excerpt:
      "Variasi pakan, musim, dan genetik ayam memengaruhi hasil. Kami mempublikasikan setiap batch — tanpa memilih yang terbaik.",
    author_type: "AI-drafted, human-reviewed",
    reviewed_by: "Founder",
    reviewed_at: "2026-05-12",
    status: "Approved",
    references: ["EV-2025-0001", "EV-2026-0014"],
  },
];

export const SAMPLE_RESEARCH = [
  {
    id: "RES-001",
    title: "Pengaruh Suplementasi Minyak Ikan terhadap Kadar DHA Telur Ayam Petelur",
    method:
      "Uji lapangan 12 minggu pada 3 kandang, kontrol vs perlakuan dengan level suplementasi berbeda. Sampling per 2 minggu, uji laboratorium pihak ketiga.",
    period: "2026-01 s/d 2026-04",
    status: "Selesai — dipublikasikan",
    linked_evidence: ["EV-2026-0014", "EV-2026-0015"],
  },
  {
    id: "RES-002",
    title: "Studi Stabilitas Kadar Omega-3 pada Penyimpanan Suhu Ruang",
    method:
      "Sampel telur diuji pada hari ke-0, 7, 14, 21. Tiga replikasi per titik waktu.",
    period: "2026-06 s/d 2026-08",
    status: "Berjalan",
    linked_evidence: [],
  },
];

export const SAMPLE_RECOGNITION = [
  {
    type: "Sertifikasi",
    title: "NKV — Nomor Kontrol Veteriner (SAMPLE)",
    issuer: "Dinas Peternakan Provinsi",
    date: "2025-08-01",
    verify_url: "#",
  },
  {
    type: "Akreditasi Laboratorium Mitra",
    title: "Laboratorium Pengujian Pangan IPB — KAN LP-XXX-IDN (SAMPLE)",
    issuer: "Komite Akreditasi Nasional",
    date: "2024-11-20",
    verify_url: "#",
  },
  {
    type: "Liputan Media",
    title: "Peternakan berbasis bukti: studi kasus 4R Farm (SAMPLE)",
    issuer: "Media Pertanian Nasional",
    date: "2026-03-15",
    verify_url: "#",
  },
];
