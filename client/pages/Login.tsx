import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authenticateUser,
  defaultUsers,
  getRoleDisplayName,
  getRoleColor,
} from "../data/users";
import { Badge } from "@/components/ui/badge";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  React.useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = authenticateUser(email, password);
    if (user) {
      // Guardar dados do utilizador
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Email ou palavra-passe incorretos");
    }
  };

  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    const user = authenticateUser(userEmail, userPassword);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-hero">
      <div className="login-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-leirisonda-text mb-2">
            Leirisonda - Gestão de Obras
          </h1>
          <p className="text-gray-600">Aceda ao sistema de gestão</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-leirisonda"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Palavra-passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-leirisonda"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-leirisonda w-full">
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="text-sm text-gray-600 hover:text-leirisonda-primary underline mb-4"
          >
            {showUsers ? "Ocultar" : "Ver"} utilizadores disponíveis
          </button>

          {showUsers && (
            <div className="bg-gray-50 rounded-md p-4 text-left">
              <h3 className="font-medium text-gray-900 mb-3 text-center">
                Utilizadores de Teste
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {defaultUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between bg-white p-3 rounded border hover:bg-gray-50 cursor-pointer"
                    onClick={() => quickLogin(user.email, user.password)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{user.name}</span>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleDisplayName(user.role)}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">
                        {user.department}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                Clique num utilizador para fazer login automático
              </p>
            </div>
          )}

          <p className="text-sm text-gray-600 mt-4">
            Ou aceda diretamente ao{" "}
            <button
              onClick={() => {
                // Auto-login as Gonçalo for testing
                const user = authenticateUser(
                  "gongonsilva@gmail.com",
                  "19867gsf",
                );
                if (user) {
                  localStorage.setItem("currentUser", JSON.stringify(user));
                }
                navigate("/dashboard");
              }}
              className="text-leirisonda-primary hover:underline font-medium"
            >
              Dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
