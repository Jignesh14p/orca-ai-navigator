import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { languages, translate, type LangCode } from "./i18n";
import { checklistItems } from "./data";

type SyncState = {
  lastSynced: string;
  done: Record<string, boolean>;
  emergencyChecked: boolean;
};

type OrcaState = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  langLabel: string;
  online: boolean;
  setOnline: (v: boolean) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (v: boolean) => void;
  autoSync: boolean;
  setAutoSync: (v: boolean) => void;
  onboarded: boolean;
  completeOnboarding: () => void;
  sync: SyncState;
  markSynced: () => void;
  toggleChecklistItem: (id: string) => void;
  setEmergencyChecked: (v: boolean) => void;
  langSheetOpen: boolean;
  setLangSheetOpen: (v: boolean) => void;
};

const OrcaContext = createContext<OrcaState | null>(null);

const STORAGE_KEY = "orca-app-state-v1";

const defaultSync: SyncState = {
  lastSynced: "Today, 06:42 AM",
  done: Object.fromEntries(checklistItems.map((i) => [i.id, true])),
  emergencyChecked: false,
};

export function OrcaProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [online, setOnline] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [onboarded, setOnboarded] = useState(false);
  const [sync, setSync] = useState<SyncState>(defaultSync);
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<{
          lang: LangCode;
          online: boolean;
          voiceEnabled: boolean;
          autoSync: boolean;
          onboarded: boolean;
          sync: SyncState;
        }>;
        if (parsed.lang) setLangState(parsed.lang);
        if (typeof parsed.online === "boolean") setOnline(parsed.online);
        if (typeof parsed.voiceEnabled === "boolean") setVoiceEnabled(parsed.voiceEnabled);
        if (typeof parsed.autoSync === "boolean") setAutoSync(parsed.autoSync);
        if (typeof parsed.onboarded === "boolean") setOnboarded(parsed.onboarded);
        if (parsed.sync) setSync({ ...defaultSync, ...parsed.sync });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lang, online, voiceEnabled, autoSync, onboarded, sync }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [hydrated, lang, online, voiceEnabled, autoSync, onboarded, sync]);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const value = useMemo<OrcaState>(
    () => ({
      lang,
      setLang: setLangState,
      t,
      langLabel: languages.find((l) => l.code === lang)?.native ?? "English",
      online,
      setOnline,
      voiceEnabled,
      setVoiceEnabled,
      autoSync,
      setAutoSync,
      onboarded,
      completeOnboarding: () => setOnboarded(true),
      sync,
      markSynced: () =>
        setSync((s) => ({
          ...s,
          lastSynced: "Today, just now",
          done: Object.fromEntries(checklistItems.map((i) => [i.id, true])),
        })),
      toggleChecklistItem: (id: string) =>
        setSync((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } })),
      setEmergencyChecked: (v: boolean) => setSync((s) => ({ ...s, emergencyChecked: v })),
      langSheetOpen,
      setLangSheetOpen,
    }),
    [lang, t, online, voiceEnabled, autoSync, onboarded, sync, langSheetOpen],
  );

  return <OrcaContext.Provider value={value}>{children}</OrcaContext.Provider>;
}

export function useOrca() {
  const ctx = useContext(OrcaContext);
  if (!ctx) throw new Error("useOrca must be used inside OrcaProvider");
  return ctx;
}
