import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserType, defaultUsers, hasPermission } from "../data/users";

export default function CreateWork() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      // Carregar todos os utilizadores activos
      const users = defaultUsers.filter((u) => u.isActive);
      setAvailableUsers(users);
      console.log("Utilizadores disponíveis:", users.length);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-leirisonda-primary mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!hasPermission(currentUser, "create_works")) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Não tem permissão para criar obras.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nova Obra</h1>

      {!currentUser && <div>A carregar utilizador...</div>}

      {currentUser && (
        <div>
          <p className="mb-4">Utilizador: {currentUser.name}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Utilizadores Disponíveis ({availableUsers.length})
            </h2>

            {availableUsers.length === 0 ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700">❌ Nenhum utilizador carregado</p>
                <p className="text-sm text-red-600">
                  Verifique se está autenticado e se os utilizadores existem
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {availableUsers.map((user) => {
                  const isSelected = selectedUsers.includes(user.id);
                  return (
                    <div
                      key={user.id}
                      className={`p-3 border rounded cursor-pointer ${
                        isSelected
                          ? "bg-green-50 border-green-300"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedUsers((prev) =>
                            prev.filter((id) => id !== user.id),
                          );
                        } else {
                          setSelectedUsers((prev) => [...prev, user.id]);
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.department}
                          </div>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs ${
                            isSelected
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {isSelected
                            ? "✓ Selecionado"
                            : "Clique para selecionar"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedUsers.length > 0 && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-medium text-green-800 mb-2">
                Utilizadores Selecionados ({selectedUsers.length})
              </h3>
              <div className="text-sm text-green-700">
                {selectedUsers
                  .map((userId) => {
                    const user = availableUsers.find((u) => u.id === userId);
                    return user?.name;
                  })
                  .join(", ")}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
