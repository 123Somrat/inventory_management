import { createContext } from "react";

export const AuthContext = createContext();

export default function Providers({ children }) {
  const User = {
    name: "somrat",
  };

  return <AuthContext.Provider value={User}>{children}</AuthContext.Provider>;
}
