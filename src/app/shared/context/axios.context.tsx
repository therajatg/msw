// import { ReactNode, createContext, useMemo } from "react";
// import axios, { AxiosInstance } from "axios";

// import { useContextFallback } from "../hooks";

// const AxiosContext = createContext<AxiosInstance | undefined>(axios);
// AxiosContext.displayName = "AxiosContext";

// interface AxiosProviderProps {
//   children: ReactNode;
// }

// export const AxiosProvider = ({ children }: AxiosProviderProps) => {
//   const value = useMemo(() => {
//     const instance = axios.create({
//       baseURL: import.meta.env.VITE_API_BASE_URL,
//     });

//     return instance;
//   }, []);

//   return (
//     <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
//   );
// };

// export const useAxios = () => useContextFallback(AxiosContext);

// axios.context.tsx
import { ReactNode, createContext, useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import { useContextFallback } from "../hooks";

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);
AxiosContext.displayName = "AxiosContext";

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const value = useMemo(() => {
    const instance = axios.create({
      baseURL: "/mock-api", // Changed this to match MSW handler
      headers: {
        "Content-Type": "application/json",
      },
    });
    return instance;
  }, []);

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
};

export const useAxios = () => useContextFallback(AxiosContext);
