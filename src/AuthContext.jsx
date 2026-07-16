import { createContext, useContext, useState } from "react";
import axios from "axios";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  const signup = async (newUser) => {
    try {
      const name = {
        username: newUser,
      };
      const { data } = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        name,
      );
      setToken(data.token);
      setLocation("TABLET");
    } catch (error) {
      console.log(error.message);
    }
  };

  const authenticate = async () => {
    const user = await axios.get(
      "https://fsa-jwt-practice.herokuapp.com/authenticate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setLocation("TUNNEL");
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
