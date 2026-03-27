import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/common/Button";
import { APP_NAME } from "@/lib/constants";

type DeferredPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const DISMISS_KEY = "chorale_install_prompt_dismissed";

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<DeferredPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const shouldShow = useMemo(() => {
    if (isStandalone()) return false;
    return localStorage.getItem(DISMISS_KEY) !== "1";
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as DeferredPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
      localStorage.setItem(DISMISS_KEY, "1");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    const fallbackTimer = setTimeout(() => {
      if (!deferredPrompt && !isStandalone() && localStorage.getItem(DISMISS_KEY) !== "1") {
        setVisible(true);
      }
    }, 2500);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [shouldShow, deferredPrompt]);

  if (!visible || !shouldShow) return null;

  const closePrompt = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) {
      closePrompt();
      return;
    }

    try {
      setIsInstalling(true);
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        localStorage.setItem(DISMISS_KEY, "1");
        setVisible(false);
      }
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92%,430px)] rounded-2xl border border-brand-200 bg-white p-4 shadow-soft dark:border-brand-900/50 dark:bg-slate-900">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute right-2 top-2 rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={closePrompt}
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="rounded-xl bg-brand-100 p-2 dark:bg-brand-900/40">
          <Smartphone className="h-5 w-5 text-brand-700 dark:text-brand-200" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Installer l'application</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Télécharge {APP_NAME} pour un accès rapide et hors ligne.
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={handleInstall} isLoading={isInstalling}>
          <Download className="h-4 w-4" /> Installer
        </Button>
        <Button variant="ghost" className="flex-1" onClick={closePrompt}>
          Plus tard
        </Button>
      </div>
    </div>
  );
}

