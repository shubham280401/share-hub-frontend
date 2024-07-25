import { createContext, ReactNode, useState } from "react";
import { STORAGE_KEYS } from "../lib/constant";
import useStorage from "../hooks/useStorage";

type InitialStateType = { [key: string]: any };

const initialState: InitialStateType = {};

export const AppContext = createContext(initialState);

type AppProviderTypes = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderTypes) => {
  const { getItem } = useStorage();
  const [authToken, setAuthToken] = useState(getItem(STORAGE_KEYS.TOKEN));

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  return (
    <AppContext.Provider
      value={{
        authToken,
        setAuthToken,
        headers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
