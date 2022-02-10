import { createContext, useState } from "react";
import apiMykonos from "services/apiMykonos";

const AuthContext = createContext({
  user: null,
  token: null,
  signIn: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("pagos_mykonos_user")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("pagos_mykonos_token") || null
  );

  const signIn = async ({ user, password }) => {
    try {
      const data = { user, password };
      // const res = await apiMykonos.auth.signIn({ data });
      const res = { data: { user: "Paul", token: "dsadsadas" }, success: true };
      if (!res.success) {
        console.error("Error", res);
        throw res;
      }
      localStorage.setItem("pagos_mykonos_user", JSON.stringify(res.data.user));
      localStorage.setItem("pagos_mykonos_token", res.data.token);
      setUser(res.data.user);
      setToken(res.data.token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logOut = () => {
    localStorage.removeItem("pagos_mykonos_user");
    localStorage.removeItem("pagos_mykonos_token");
    setUser(null);
    setToken(null);
  };

  const value = { user, token, signIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
