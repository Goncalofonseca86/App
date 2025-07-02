import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple auth simulation
    if (email && password) {
      navigate("/work-assignment");
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
          <p className="text-sm text-gray-600">
            Ou aceda diretamente à{" "}
            <button
              onClick={() => navigate("/work-assignment")}
              className="text-leirisonda-primary hover:underline font-medium"
            >
              Atribuição de Obras
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
