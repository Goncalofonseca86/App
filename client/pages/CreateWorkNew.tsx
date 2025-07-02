import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserType, defaultUsers, hasPermission } from "../data/users";

interface CreateWorkForm {
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  deadline: string;
  destinedUsers: string[];
}

export default function CreateWork() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
  const [formData, setFormData] = useState<CreateWorkForm>({
    title: "",
    description: "",
    location: "",
    priority: "medium",
    estimatedHours: 1,
    deadline: "",
    destinedUsers: [],
  });

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      console.log("Utilizador actual:", user);

      // Carregar todos os utilizadores activos
      const users = defaultUsers.filter((u) => u.isActive);
      setAvailableUsers(users);
      console.log("Utilizadores disponíveis:", users);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Erro: Utilizador não encontrado");
      return;
    }

    // Criar nova obra
    const newWork = {
      id: Date.now().toString(),
      ...formData,
      status: "pending" as const,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    // Guardar no localStorage
    const existingWorks = JSON.parse(localStorage.getItem("works") || "[]");
    existingWorks.push(newWork);
    localStorage.setItem("works", JSON.stringify(existingWorks));

    console.log("Obra criada:", newWork);
    console.log("Total obras:", existingWorks.length);

    alert(
      `Obra criada com sucesso! ${formData.destinedUsers.length} utilizadores atribuídos.`,
    );
    navigate("/dashboard");
  };

  const addUserToWork = (userId: string) => {
    console.log("Adicionando utilizador:", userId);
    if (!formData.destinedUsers.includes(userId)) {
      setFormData((prev) => ({
        ...prev,
        destinedUsers: [...prev.destinedUsers, userId],
      }));
    }
  };

  const removeUserFromWork = (userId: string) => {
    console.log("Removendo utilizador:", userId);
    setFormData((prev) => ({
      ...prev,
      destinedUsers: prev.destinedUsers.filter((id) => id !== userId),
    }));
  };

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nova Obra</h1>
        <p className="text-gray-600">Criar nova obra e atribuir utilizadores</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detalhes da Obra */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Detalhes da Obra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary"
                  placeholder="Ex: Manutenção de Piscina - Cliente X"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary min-h-[100px] resize-y"
                  placeholder="Descreva os detalhes da obra..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Localização *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary"
                  placeholder="Ex: Porto, Vila Nova de Gaia"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        priority: e.target.value as any,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Horas Estimadas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.estimatedHours}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        estimatedHours: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Prazo
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leirisonda-primary"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Utilizadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Utilizadores Destinados ({formData.destinedUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Debug Info */}
              {availableUsers.length === 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Nenhum utilizador disponível
                    </span>
                  </div>
                </div>
              )}

              {/* Utilizadores Selecionados */}
              {formData.destinedUsers.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-green-700">
                    Selecionados:
                  </h4>
                  <div className="space-y-2">
                    {formData.destinedUsers.map((userId) => {
                      const user = availableUsers.find((u) => u.id === userId);
                      return user ? (
                        <div
                          key={user.id}
                          className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-medium text-green-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-green-700">
                                {user.department}
                              </div>
                            </div>
                            <Badge className={getRoleColor(user.role)}>
                              {getRoleDisplayName(user.role)}
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeUserFromWork(user.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Utilizadores Disponíveis */}
              <div>
                <h4 className="font-medium mb-3">
                  Adicionar utilizadores: (
                  {
                    availableUsers.filter(
                      (user) => !formData.destinedUsers.includes(user.id),
                    ).length
                  }{" "}
                  disponíveis)
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {availableUsers
                    .filter((user) => !formData.destinedUsers.includes(user.id))
                    .map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => addUserToWork(user.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              {user.department}
                            </div>
                          </div>
                          <Badge className={getRoleColor(user.role)}>
                            {getRoleDisplayName(user.role)}
                          </Badge>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              !formData.title || !formData.description || !formData.location
            }
          >
            Criar Obra
          </Button>
        </div>
      </form>
    </div>
  );
}
