"use client";

import * as React from "react";

interface RecruiterModeContextValue {
  recruiterMode: boolean;
  setRecruiterMode: (value: boolean) => void;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = React.createContext<RecruiterModeContextValue | null>(null);

const STORAGE_KEY = "recruiter-mode";

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterModeState] = React.useState(false);

  // Reads a one-time initial value from the URL/localStorage on mount —
  // there's no external-store subscription to model this as, so a single
  // setState here is the correct (if lint-noisy) approach.
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("recruiter") === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecruiterModeState(true);
        return;
      }
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setRecruiterModeState(true);
    } catch {
      // ignore — localStorage may be unavailable
    }
  }, []);

  const setRecruiterMode = React.useCallback((value: boolean) => {
    setRecruiterModeState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // ignore
    }
  }, []);

  const toggleRecruiterMode = React.useCallback(() => {
    setRecruiterMode(!recruiterMode);
  }, [recruiterMode, setRecruiterMode]);

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, setRecruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const ctx = React.useContext(RecruiterModeContext);
  if (!ctx) throw new Error("useRecruiterMode must be used within RecruiterModeProvider");
  return ctx;
}
