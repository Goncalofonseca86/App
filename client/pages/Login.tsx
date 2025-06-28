import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export const Login: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Email ou palavra-passe inválidos");
    }
  };

  return (
    <div className="login-hero">
      <div className="login-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-leirisonda-primary mb-2">
            Leirisonda
          </h1>
          <p className="text-gray-600">Sistema de Gestão de Obras</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
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
              placeholder="Introduza o seu email"
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
              placeholder="Introduza a sua palavra-passe"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-leirisonda w-full"
          >
            {isLoading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};
