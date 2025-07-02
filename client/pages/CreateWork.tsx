import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  User as UserType,
  defaultUsers,
  getRoleDisplayName,
  getRoleColor,
  hasPermission,
} from "../data/users";
import UserAssignmentSelector from "../components/UserAssignmentSelector";
import {
  ArrowLeft,
  Plus,
  X,
  Users,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

interface CreateWorkForm {
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  deadline: string;
  destinedUsers: string[]; // IDs dos utilizadores destinados
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

      // Carregar TODOS os utilizadores (incluindo o próprio para teste)
      const users = defaultUsers.filter((u) => u.isActive);
      setAvailableUsers(users);

      // Debug: mostrar utilizadores disponíveis
      console.log(
        "Utilizadores disponíveis para atribuição:",
        users.map((u) => `${u.name} (${u.role})`),
      );
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !hasPermission(currentUser, "create_works")) {
      alert("Não tem permissão para criar obras");
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

    // Guardar no localStorage (em produção seria uma API)
    const existingWorks = JSON.parse(localStorage.getItem("works") || "[]");
    existingWorks.push(newWork);
    localStorage.setItem("works", JSON.stringify(existingWorks));

    console.log("Obra criada:", newWork);
    console.log("Total de obras guardadas:", existingWorks.length);

    alert(
      `Obra criada com sucesso! ${formData.destinedUsers.length} utilizadores atribuídos.`,
    );
    navigate("/dashboard");
  };

  const addUserToWork = (userId: string) => {
    if (!formData.destinedUsers.includes(userId)) {
      setFormData((prev) => ({
        ...prev,
        destinedUsers: [...prev.destinedUsers, userId],
      }));
    }
  };

  const removeUserFromWork = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      destinedUsers: prev.destinedUsers.filter((id) => id !== userId),
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!currentUser) {
    return (
      <div className="leirisonda-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-leirisonda-primary mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!hasPermission(currentUser, "create_works")) {
    return (
      <div className="leirisonda-main flex items-center justify-center">
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
    <div className="leirisonda-main">
      <div className="dashboard-hero">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Criar Nova Obra
            </h1>
            <p className="text-white/90">
              Definir detalhes da obra e selecionar utilizadores destinados
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detalhes da Obra */}
            <Card className="card-leirisonda">
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
                    className="input-leirisonda"
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
                    className="input-leirisonda min-h-[100px] resize-y"
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
                    className="input-leirisonda"
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
                      className="input-leirisonda"
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
                      className="input-leirisonda"
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
                    className="input-leirisonda"
                    required
                  />
                </div>

                {/* Preview da Obra */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Preview:</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">
                      {formData.title || "Título da obra"}
                    </span>
                    <Badge className={getPriorityColor(formData.priority)}>
                      {formData.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.description || "Descrição da obra"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📍 {formData.location || "Localização"}</span>
                    <span>⏰ {formData.estimatedHours}h</span>
                    <span>📅 {formData.deadline || "Sem prazo"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seleção de Utilizadores */}
            <UserAssignmentSelector
              availableUsers={availableUsers}
              selectedUserIds={formData.destinedUsers}
              onUserSelect={addUserToWork}
              onUserRemove={removeUserFromWork}
              currentUserId={currentUser.id}
              allowSelfAssignment={true}
            />
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
              className="btn-leirisonda"
              disabled={
                !formData.title || !formData.description || !formData.location
              }
            >
              Criar Obra
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
