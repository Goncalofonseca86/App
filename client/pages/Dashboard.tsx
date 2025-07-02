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
import {
  Plus,
  Users,
  Calendar,
  MapPin,
  Clock,
  LogOut,
  Edit,
  Eye,
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
  destinedUsers: string[];
  createdBy: string;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [myWorks, setMyWorks] = useState<Work[]>([]);
  const [allWorks, setAllWorks] = useState<Work[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      // Carregar obras do localStorage
      const savedWorks = JSON.parse(localStorage.getItem("works") || "[]");
      setAllWorks(savedWorks);

      // Filtrar obras destinadas ao utilizador atual
      const userWorks = savedWorks.filter((work: Work) =>
        work.destinedUsers.includes(user.id),
      );
      setMyWorks(userWorks);

      // Se for admin/manager, mostrar todas as obras
      if (
        hasPermission(user, "view_reports") ||
        hasPermission(user, "manage_system")
      ) {
        setWorks(savedWorks);
      } else {
        setWorks(userWorks);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
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

  const getStatusText = (status: string) => {
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

  const getUsersForWork = (work: Work) => {
    return work.destinedUsers
      .map((userId) => defaultUsers.find((user) => user.id === userId))
      .filter(Boolean);
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

  const canCreateWorks = hasPermission(currentUser, "create_works");
  const canViewAllWorks =
    hasPermission(currentUser, "view_reports") ||
    hasPermission(currentUser, "manage_system");

  return (
    <div className="leirisonda-main">
      {/* Header */}
      <div className="dashboard-hero">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-white/90">
              Gerir e acompanhar o progresso das obras
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-medium">{currentUser.name}</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  {getRoleDisplayName(currentUser.role)}
                </Badge>
                <span className="text-white/70 text-sm">
                  {currentUser.department}
                </span>
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

      {/* Stats Cards */}
      <div className="stats-grid mb-8">
        <Card className="stat-card-leirisonda stat-card-primary">
          <div className="text-2xl font-bold text-leirisonda-primary">
            {myWorks.length}
          </div>
          <div className="text-sm text-gray-600">Minhas Obras</div>
        </Card>

        <Card className="stat-card-leirisonda stat-card-warning">
          <div className="text-2xl font-bold text-orange-600">
            {myWorks.filter((w) => w.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </Card>

        <Card className="stat-card-leirisonda stat-card-secondary">
          <div className="text-2xl font-bold text-leirisonda-secondary">
            {myWorks.filter((w) => w.status === "in_progress").length}
          </div>
          <div className="text-sm text-gray-600">Em Progresso</div>
        </Card>

        <Card className="stat-card-leirisonda stat-card-success">
          <div className="text-2xl font-bold text-green-600">
            {myWorks.filter((w) => w.status === "completed").length}
          </div>
          <div className="text-sm text-gray-600">Concluídas</div>
        </Card>

        {canViewAllWorks && (
          <Card className="stat-card-leirisonda stat-card-primary">
            <div className="text-2xl font-bold text-leirisonda-primary">
              {allWorks.length}
            </div>
            <div className="text-sm text-gray-600">Total de Obras</div>
          </Card>
        )}
      </div>

      <div className="content-grid">
        {/* Obras Destinadas ao Utilizador */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {canViewAllWorks ? "Todas as Obras" : "Minhas Obras"}
            </h2>
            <div className="flex gap-2">
              {canCreateWorks && (
                <Button
                  onClick={() => navigate("/create-work")}
                  className="btn-leirisonda"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Obra
                </Button>
              )}
              {hasPermission(currentUser, "assign_works") && (
                <Button
                  variant="outline"
                  onClick={() => navigate("/gestao-utilizadores-obras")}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Gerir Utilizadores
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/work-assignment")}
              >
                <Users className="w-4 h-4 mr-2" />
                Atribuição Avançada
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {works.length === 0 ? (
              <Card className="card-leirisonda">
                <CardContent className="text-center py-8">
                  <div className="text-gray-500 mb-4">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    {canViewAllWorks
                      ? "Nenhuma obra criada ainda"
                      : "Nenhuma obra destinada para si"}
                  </div>
                  {canCreateWorks && (
                    <Button onClick={() => navigate("/create-work")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeira Obra
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              works.map((work) => {
                const assignedUsers = getUsersForWork(work);
                const isMyWork = work.destinedUsers.includes(currentUser.id);

                return (
                  <Card
                    key={work.id}
                    className={`card-leirisonda ${isMyWork ? "border-blue-200 bg-blue-50/30" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">
                              {work.title}
                            </CardTitle>
                            {isMyWork && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                Minha Obra
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {work.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(work.priority)}>
                            {work.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(work.status)}>
                            {getStatusText(work.status)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {work.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {work.estimatedHours}h estimadas
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Prazo:{" "}
                          {new Date(work.deadline).toLocaleDateString("pt-PT")}
                        </div>
                      </div>

                      {/* Utilizadores Destinados */}
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Destinados ({assignedUsers.length}):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {assignedUsers.map(
                            (user) =>
                              user && (
                                <div
                                  key={user.id}
                                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                                >
                                  <span className="text-sm font-medium">
                                    {user.name}
                                  </span>
                                  <Badge className={getRoleColor(user.role)}>
                                    {getRoleDisplayName(user.role)}
                                  </Badge>
                                </div>
                              ),
                          )}
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          Criada em{" "}
                          {new Date(work.createdAt).toLocaleDateString("pt-PT")}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          {(canCreateWorks || isMyWork) && (
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="space-y-4">
            {canCreateWorks && (
              <Card
                className="card-leirisonda hover-leirisonda cursor-pointer"
                onClick={() => navigate("/create-work")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-leirisonda-primary/10 rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-leirisonda-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Criar Nova Obra</div>
                      <div className="text-sm text-gray-500">
                        Definir nova obra e destinatários
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card
              className="card-leirisonda hover-leirisonda cursor-pointer"
              onClick={() => navigate("/work-assignment")}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-leirisonda-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-leirisonda-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Gestão de Atribuições</div>
                    <div className="text-sm text-gray-500">
                      Gerir atribuição de obras a técnicos
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {hasPermission(currentUser, "view_pools") && (
              <Card className="card-leirisonda hover-leirisonda cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">🏊</span>
                    </div>
                    <div>
                      <div className="font-medium">Gestão de Piscinas</div>
                      <div className="text-sm text-gray-500">
                        Ver e editar informações das piscinas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasPermission(currentUser, "view_pool_maintenance") && (
              <Card className="card-leirisonda hover-leirisonda cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🔧</span>
                    </div>
                    <div>
                      <div className="font-medium">Manutenções</div>
                      <div className="text-sm text-gray-500">
                        Gerir manutenções de piscinas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
