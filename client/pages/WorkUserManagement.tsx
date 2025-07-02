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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Users,
  Calendar,
  MapPin,
  Clock,
  Save,
  UserPlus,
  Building,
  AlertCircle,
  CheckCircle,
  LogOut,
} from "lucide-react";

interface Work {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  deadline: string;
  status: "pending" | "assigned" | "in_progress" | "completed";
  assignedUsers?: string[]; // IDs dos utilizadores atribuídos
  createdBy?: string;
  createdAt?: string;
}

interface WorkAssignment {
  workId: string;
  userId: string;
  assignedAt: string;
  assignedBy: string;
  role?: string; // Papel específico do utilizador nesta obra
  notes?: string;
}

export default function WorkUserManagement() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedWorkId, setSelectedWorkId] = useState<string>("");
  const [assignments, setAssignments] = useState<WorkAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      // Carregar utilizadores ativos
      const users = defaultUsers.filter((u) => u.isActive);
      setAvailableUsers(users);

      // Carregar obras existentes
      loadWorks();

      // Carregar atribuições existentes
      loadAssignments();
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const loadWorks = () => {
    // Carregar obras do localStorage ou dados mockados
    const savedWorks = localStorage.getItem("works");
    if (savedWorks) {
      setWorks(JSON.parse(savedWorks));
    } else {
      // Dados mockados para demonstração
      const mockWorks: Work[] = [
        {
          id: "1",
          title: "Manutenção de Piscina - Villa São João",
          description: "Limpeza completa e verificação do sistema de filtração",
          location: "Vila Nova de Gaia",
          priority: "high",
          estimatedHours: 4,
          deadline: "2024-01-20",
          status: "pending",
          assignedUsers: [],
        },
        {
          id: "2",
          title: "Instalação de Sistema de Aquecimento",
          description: "Instalação de bomba de calor para piscina residencial",
          location: "Porto",
          priority: "medium",
          estimatedHours: 8,
          deadline: "2024-01-25",
          status: "assigned",
          assignedUsers: ["user1"],
        },
        {
          id: "3",
          title: "Reparação de Bomba de Circulação",
          description: "Substituição de componentes da bomba principal",
          location: "Matosinhos",
          priority: "high",
          estimatedHours: 3,
          deadline: "2024-01-15",
          status: "in_progress",
          assignedUsers: ["admin1", "user1"],
        },
      ];
      setWorks(mockWorks);
      localStorage.setItem("works", JSON.stringify(mockWorks));
    }
  };

  const loadAssignments = () => {
    const savedAssignments = localStorage.getItem("workAssignments");
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  };

  const saveAssignments = (newAssignments: WorkAssignment[]) => {
    setAssignments(newAssignments);
    localStorage.setItem("workAssignments", JSON.stringify(newAssignments));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const getCurrentWork = (): Work | null => {
    return works.find((work) => work.id === selectedWorkId) || null;
  };

  const handleUserSelect = (userId: string) => {
    if (!selectedWorkId || !currentUser) return;

    const currentWork = getCurrentWork();
    if (!currentWork) return;

    // Adicionar utilizador à obra
    const updatedWorks = works.map((work) =>
      work.id === selectedWorkId
        ? {
            ...work,
            assignedUsers: [...(work.assignedUsers || []), userId],
            status:
              work.status === "pending" ? ("assigned" as const) : work.status,
          }
        : work,
    );
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));

    // Criar registo de atribuição
    const newAssignment: WorkAssignment = {
      workId: selectedWorkId,
      userId: userId,
      assignedAt: new Date().toISOString(),
      assignedBy: currentUser.id,
    };

    const updatedAssignments = [...assignments, newAssignment];
    saveAssignments(updatedAssignments);
  };

  const handleUserRemove = (userId: string) => {
    if (!selectedWorkId) return;

    // Remover utilizador da obra
    const updatedWorks = works.map((work) =>
      work.id === selectedWorkId
        ? {
            ...work,
            assignedUsers: (work.assignedUsers || []).filter(
              (id) => id !== userId,
            ),
            status:
              (work.assignedUsers || []).filter((id) => id !== userId)
                .length === 0
                ? ("pending" as const)
                : work.status,
          }
        : work,
    );
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));

    // Remover registo de atribuição
    const updatedAssignments = assignments.filter(
      (assignment) =>
        !(assignment.workId === selectedWorkId && assignment.userId === userId),
    );
    saveAssignments(updatedAssignments);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "assigned":
        return "Atribuída";
      case "in_progress":
        return "Em Progresso";
      case "completed":
        return "Concluída";
      default:
        return status;
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="leirisonda-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-leirisonda-primary mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  const canAssignWorks = hasPermission(currentUser, "assign_works");

  if (!canAssignWorks) {
    return (
      <div className="leirisonda-main flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600 flex items-center gap-2 justify-center">
              <AlertCircle className="w-5 h-5" />
              Acesso Negado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Não tem permissão para gerir atribuições de obras.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentWork = getCurrentWork();

  return (
    <div className="leirisonda-main">
      {/* Header */}
      <div className="dashboard-hero">
        <div className="flex justify-between items-start">
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
                Gestão de Atribuições
              </h1>
              <p className="text-white/90">
                Atribuir e gerir utilizadores nas obras
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-medium">{currentUser.name}</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  {getRoleDisplayName(currentUser.role)}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seleção de Obra */}
          <Card className="card-leirisonda">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Selecionar Obra
              </CardTitle>
              <CardDescription>
                Escolha a obra para gerir as atribuições de utilizadores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Obra Disponível
                </label>
                <Select
                  value={selectedWorkId}
                  onValueChange={setSelectedWorkId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma obra..." />
                  </SelectTrigger>
                  <SelectContent>
                    {works.map((work) => (
                      <SelectItem key={work.id} value={work.id}>
                        <div className="flex items-center gap-2">
                          <span>{work.title}</span>
                          <Badge
                            className={getStatusColor(work.status)}
                            variant="outline"
                          >
                            {getStatusDisplayName(work.status)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Detalhes da Obra Selecionada */}
              {currentWork && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Detalhes da Obra
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Título:</span>
                      <span>{currentWork.title}</span>
                      <Badge className={getPriorityColor(currentWork.priority)}>
                        {currentWork.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {currentWork.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {currentWork.estimatedHours}h estimadas
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Prazo:{" "}
                      {new Date(currentWork.deadline).toLocaleDateString(
                        "pt-PT",
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusColor(currentWork.status)}>
                        {getStatusDisplayName(currentWork.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">
                        Utilizadores atribuídos:{" "}
                        {currentWork.assignedUsers?.length || 0}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-sm text-gray-700">
                      <strong>Descrição:</strong> {currentWork.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Estatísticas */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">
                    {works.length}
                  </div>
                  <div className="text-sm text-gray-600">Total de Obras</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      works.filter(
                        (w) =>
                          w.status === "assigned" || w.status === "in_progress",
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Com Atribuições</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestão de Utilizadores */}
          {selectedWorkId && currentWork ? (
            <UserAssignmentSelector
              availableUsers={availableUsers}
              selectedUserIds={currentWork.assignedUsers || []}
              onUserSelect={handleUserSelect}
              onUserRemove={handleUserRemove}
              currentUserId={currentUser.id}
              allowSelfAssignment={true}
            />
          ) : (
            <Card className="card-leirisonda">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Atribuição de Utilizadores
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Selecione uma obra</p>
                  <p className="text-sm">
                    Escolha uma obra na coluna à esquerda para gerir as
                    atribuições de utilizadores
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lista de Obras para Visão Geral */}
        <div className="mt-8">
          <Card className="card-leirisonda">
            <CardHeader>
              <CardTitle>Visão Geral das Obras</CardTitle>
              <CardDescription>
                Estado atual de todas as obras e suas atribuições
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {works.map((work) => (
                  <div
                    key={work.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      selectedWorkId === work.id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedWorkId(work.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{work.title}</h4>
                        <p className="text-sm text-gray-600">{work.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(work.priority)}>
                          {work.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(work.status)}>
                          {getStatusDisplayName(work.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        <Clock className="w-4 h-4 inline mr-1" />
                        {work.estimatedHours}h • Prazo:{" "}
                        {new Date(work.deadline).toLocaleDateString("pt-PT")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {work.assignedUsers?.length || 0} utilizador
                        {(work.assignedUsers?.length || 0) !== 1 ? "es" : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
