/**
 * West Score - Context Providers
 * Global state management for games (Arabic only, always RTL)
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { applyRTL } from "../i18n";
import { loadGames } from "./storage";
import { Game } from "./types";

// ==================== App Context (RTL is always true) ====================

interface AppContextType {
  isRTL: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Always apply RTL for Arabic-only app
    applyRTL();
  }, []);

  return (
    <AppContext.Provider value={{ isRTL: true }}>
      {children}
    </AppContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(AppContext);
  if (!context) {
    // Return default RTL context if not wrapped
    return { isRTL: true };
  }
  return context;
}

// ==================== Games Context ====================

interface GamesContextType {
  games: Game[];
  isLoading: boolean;
  refreshGames: () => Promise<void>;
  updateGamesState: (games: Game[]) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshGames = useCallback(async () => {
    setIsLoading(true);
    const loaded = await loadGames();
    setGames(loaded);
    setIsLoading(false);
  }, []);

  const updateGamesState = useCallback((newGames: Game[]) => {
    setGames(newGames);
  }, []);

  useEffect(() => {
    refreshGames();
  }, [refreshGames]);

  return (
    <GamesContext.Provider
      value={{ games, isLoading, refreshGames, updateGamesState }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
}

// ==================== Combined Provider ====================

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <GamesProvider>{children}</GamesProvider>
    </AppContextProvider>
  );
}
