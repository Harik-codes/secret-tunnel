import { createContext, useContext, useState } from "react";

const AuthContext = createContex();

export function AuthProvider({ children }) {
  const value = {};
  return <authcontext.provider value={value}>{children}</authcontext.provider>;
}

export function useAuth