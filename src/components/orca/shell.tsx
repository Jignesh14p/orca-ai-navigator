import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Check, Globe, Home, Map, Radio, User, WifiOff } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { languages } from "@/lib/orca/i18n";
import { useOrca } from "@/lib/orca/state";
import { cn } from "@/lib/utils";

export function OrcaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="ORCA">
      <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.12" />
      <path
        d="M8 30c6 0 8-14 16-14s7 10 16 10c-2 6-9 10-16 10S10 34 8 30Z"
        fill="currentColor"
        opacity="0.95"
      />
      <circle cx="30" cy="24" r="2.4" fill="var(--color-navy)" />
      <path d="M22 16c1-4 4-7 8-8-1 4-3 7-6 9Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function ConnectivityStrip() {
  const { online, t } = useOrca();
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-1.5 text-[11px] font-semibold tracking-wide",
        online ? "bg-sea/12 text-sea" : "bg-ocean/12 text-ocean",
      )}
    >
      {online ? (
        <>
          <span className="size-2 rounded-full bg-sea" />
          {t("online")}
        </>
      ) : (
        <>
          <WifiOff className="size-3.5" />
          {t("offline")} · {t("offlineNote")}
        </>
      )}
    </div>
  );
}

export function LanguageButton({ dark = false }: { dark?: boolean }) {
  const { setLangSheetOpen, langLabel } = useOrca();
  return (
    <button
      type="button"
      onClick={() => setLangSheetOpen(true)}
      className={cn(
        "flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold",
        dark ? "bg-navy-foreground/15 text-navy-foreground" : "bg-secondary text-secondary-foreground",
      )}
    >
      <Globe className="size-4" />
      {langLabel}
    </button>
  );
}

export function LanguageSheet() {
  const { langSheetOpen, setLangSheetOpen, lang, setLang, t } = useOrca();
  if (!langSheetOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={() => setLangSheetOpen(false)}
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
      />
      <div className="animate-in slide-in-from-bottom relative w-full max-w-md rounded-t-3xl bg-card p-5 pb-8 shadow-float duration-300">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <h2 className="mb-3 text-base font-extrabold tracking-wide">{t("selectLanguage")}</h2>
        <div className="space-y-1">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setLangSheetOpen(false);
                toast.success(`✓ ${l.native} — language updated`);
              }}
              className={cn(
                "flex min-h-14 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-semibold",
                lang === l.code ? "bg-ocean/10 text-ocean" : "bg-muted/60 text-foreground",
              )}
            >
              <span>
                {l.native}
                <span className="ml-2 text-xs font-medium text-muted-foreground">{l.label}</span>
              </span>
              {lang === l.code && <Check className="size-5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { to: "/", key: "home", icon: Home },
  { to: "/map", key: "map", icon: Map },
  { to: "/ai", key: "orcaAi", icon: Radio },
  { to: "/alerts", key: "alerts", icon: Bell },
  { to: "/profile", key: "profile", icon: User },
] as const;

export function BottomNav() {
  const { t } = useOrca();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-card/95 pb-1 backdrop-blur">
      <ul className="mx-auto flex max-w-md">
        {tabs.map(({ to, key, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold",
                  active ? "text-ocean" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl",
                    active && "bg-ocean/12",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({
  children,
  showNav = true,
  showStrip = true,
}: {
  children: ReactNode;
  showNav?: boolean;
  showStrip?: boolean;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      {showStrip && <ConnectivityStrip />}
      <main className="flex-1">{children}</main>
      {showNav && <BottomNav />}
      <LanguageSheet />
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  back = "/",
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: string;
}) {
  return (
    <header className="ocean-depth px-4 pt-4 pb-6 text-navy-foreground">
      <div className="flex items-center gap-3">
        <Link
          to={back}
          className="flex size-10 items-center justify-center rounded-full bg-navy-foreground/15 text-lg"
          aria-label="Back"
        >
          ←
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-extrabold tracking-wide">{title}</h1>
          {subtitle && <p className="text-xs text-navy-foreground/70">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl bg-card p-4 shadow-card", className)}>{children}</section>
  );
}

export function Meter({
  value,
  tone = "ocean",
}: {
  value: number;
  tone?: "ocean" | "sea" | "caution" | "danger";
}) {
  const toneClass = {
    ocean: "bg-ocean",
    sea: "bg-sea",
    caution: "bg-caution",
    danger: "bg-danger",
  }[tone];
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-all duration-700", toneClass)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
