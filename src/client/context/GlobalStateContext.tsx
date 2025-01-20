"use client";

import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { errorManager } from "../utils/errorManager";

type GlobalStateContextType = {
  error: string | null;
  setError: (error: string) => void;
  clearError: () => void;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export const GlobalStateProvider: FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [error, setErrorState] = useState<string | null>(null);
  const setError = (error: string) => setErrorState(error);
  const clearError = () => setErrorState(null);

  useEffect(() => {
    errorManager.setHandler((message) => {
      setErrorState(message);
    });

    return () => {
      errorManager.setHandler(() => null);
    };
  }, []);

  return (
    <GlobalStateContext.Provider value={{ error, setError, clearError }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  
  return context;
};
