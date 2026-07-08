import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/verification", label: "Verifikasi" },
  { to: "/dataset", label: "Dataset" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/research", label: "Riset" },
  { to: "/recognition", label: "Pengakuan" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex items-center justify-between h-16 gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-serif font-bold">
            4R
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            4R Farm
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/verification"
          className="hidden sm:inline-flex items-center rounded-md bg-primary text-primary-foreground text-sm font-medium px-3 py-1.5 hover:bg-primary/90"
        >
          Verifikasi Batch
        </Link>
      </div>
      <nav className="md:hidden border-t border-border overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 text-sm whitespace-nowrap">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="px-3 py-1.5 rounded-md text-muted-foreground"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-serif text-lg font-semibold">4R Farm</div>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Evidence-Based Digital Authority Platform. Setiap klaim ilmiah dapat
            ditelusuri kembali ke bukti laboratorium bernomor.
          </p>
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            Data di situs ini bertanda SAMPLE adalah data contoh untuk demonstrasi.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Navigasi</div>
          <ul className="space-y-1 text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Prinsip</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>Append-only — tidak ada hapus permanen</li>
            <li>Evidence Published bersifat immutable</li>
            <li>Setiap angka wajib punya sumber lab</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} 4R Farm. Semua data lab bersifat publik.</span>
          <span className="font-mono">MRS v1.2 · Architecture Baseline v1.0</span>
        </div>
      </div>
    </footer>
  );
}
