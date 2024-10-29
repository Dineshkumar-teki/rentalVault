"use client";

import { createContext, useContext, useState } from "react";

// Create context

const GlobalContext = createContext();

// Create a Provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
