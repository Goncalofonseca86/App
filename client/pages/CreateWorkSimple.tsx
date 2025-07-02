import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { defaultUsers } from "../data/users";

export default function CreateWork() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  useEffect(() => {
    // Verificar se está autenticado
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      console.log("Utilizador logado:", user);
    } else {
      console.log("Não há utilizador logado, redirecionando...");
      navigate("/login");
      return;
    }

    // Carregar utilizadores
    console.log("Carregando utilizadores...");
    console.log("defaultUsers:", defaultUsers);
    setAvailableUsers(defaultUsers);
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nova Obra - Teste</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Informação do Utilizador</h2>
        {currentUser ? (
          <div>
            <p>
              <strong>Nome:</strong> {currentUser.name}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Departamento:</strong> {currentUser.department}
            </p>
          </div>
        ) : (
          <p>A carregar utilizador...</p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Utilizadores Disponíveis ({availableUsers.length})</h2>
        {availableUsers.length === 0 ? (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
            }}
          >
            <p style={{ color: "red" }}>❌ Nenhum utilizador encontrado!</p>
            <p>Isto indica um problema com o carregamento dos dados.</p>
          </div>
        ) : (
          <div>
            {availableUsers.map((user, index) => (
              <div
                key={user.id || index}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>{user.name}</strong> - {user.email}
                <br />
                <small>
                  {user.department} | {user.role}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Voltar ao Dashboard
        </button>
      </div>
    </div>
  );
}
