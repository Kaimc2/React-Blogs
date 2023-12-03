import { createContext, useState } from "react";

interface AuthField {
  user: { id: number; name: string };
  token: string;
  setToken: (token: string) => void;
  setUser: (user: { id: number; name: string }) => void;
  initialUser: { id: number; name: string };
  initialToken: string;
}

const AuthContext = createContext<AuthField>({
  user: { id: 0, name: "" },
  token: "",
  setToken: () => {},
  setUser: () => {},
  initialUser: { id: 0, name: "" },
  initialToken: "",
});

export const initialUser = { id: 0, name: "" };
export const initialToken = "";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(initialUser);
  const [token, _setToken] = useState(initialToken);

  const setToken = (token: string) => {
    _setToken(token);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, setToken, setUser, initialToken, initialUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
