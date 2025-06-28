import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("leirisonda_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("leirisonda_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Utilizadores pré-definidos do sistema Leirisonda
      const users = [
        {
          id: "1",
          email: "gongonsilva@gmail.com",
          password: "19867gsff",
          name: "Gonçalo Silva",
          role: "admin",
        },
        {
          id: "2",
          email: "goncalo@leirisonda.pt",
          password: "goncalo123",
          name: "Gonçalo Fonseca",
          role: "gestor",
        },
        {
          id: "3",
          email: "tecnico@leirisonda.pt",
          password: "tecnico123",
          name: "Técnico Obras",
          role: "tecnico",
        },
        {
          id: "4",
          email: "supervisor@leirisonda.pt",
          password: "super123",
          name: "Supervisor Piscinas",
          role: "supervisor",
        },
        {
          id: "5",
          email: "operador@leirisonda.pt",
          password: "oper123",
          name: "Operador Campo",
          role: "operador",
        },
      ];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const mockUser: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        };
        setUser(mockUser);
        localStorage.setItem("leirisonda_user", JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("leirisonda_user");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
