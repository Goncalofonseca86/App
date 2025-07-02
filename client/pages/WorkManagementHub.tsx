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
  getRoleDisplayName,
  hasPermission,
} from "../data/users";
import WorkManagementNavigation from "../components/WorkManagementNavigation";
import {
  ArrowLeft,
  LogOut,
  Building,
  Users,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface WorkStats {
  total: number;
  pending: number;
  assigned: number;
  inProgress: number;
  completed: number;
  myWorks: number;
}

export default function WorkManagementHub() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [workStats, setWorkStats] = useState<WorkStats>({
    total: 0,
    pending: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    myWorks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);

      // Carregar estatísticas das obras
      loadWorkStats(user);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const loadWorkStats = (user: UserType) => {
    // Carregar obras do localStorage
    const savedWorks = JSON.parse(localStorage.getItem("works") || "[]");

    const stats: WorkStats = {
      total: savedWorks.length,
      pending: savedWorks.filter((w: any) => w.status === "pending").length,
      assigned: savedWorks.filter((w: any) => w.status === "assigned").length,
      inProgress: savedWorks.filter((w: any) => w.status === "in_progress")
        .length,
      completed: savedWorks.filter((w: any) => w.status === "completed").length,
      myWorks: savedWorks.filter(
        (w: any) =>
          w.destinedUsers?.includes(user.id) ||
          w.assignedUsers?.includes(user.id),
      ).length,
    };

    setWorkStats(stats);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
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
              Dashboard
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Centro de Gestão de Obras
              </h1>
              <p className="text-white/90">
                Centralize a gestão de obras e atribuições de utilizadores
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

      <div className="max-w-6xl mx-auto">
        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="stat-card-leirisonda stat-card-primary">
            <CardContent className="p-4 text-center">
              <Building className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-blue-600">
                {workStats.total}
              </div>
              <div className="text-xs text-gray-600">Total de Obras</div>
            </CardContent>
          </Card>

          <Card className="stat-card-leirisonda stat-card-warning">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-xl font-bold text-orange-600">
                {workStats.pending}
              </div>
              <div className="text-xs text-gray-600">Pendentes</div>
            </CardContent>
          </Card>

          <Card className="stat-card-leirisonda stat-card-secondary">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-xl font-bold text-purple-600">
                {workStats.assigned}
              </div>
              <div className="text-xs text-gray-600">Atribuídas</div>
            </CardContent>
          </Card>

          <Card className="stat-card-leirisonda stat-card-info">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-xl font-bold text-blue-500">
                {workStats.inProgress}
              </div>
              <div className="text-xs text-gray-600">Em Progresso</div>
            </CardContent>
          </Card>

          <Card className="stat-card-leirisonda stat-card-success">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold text-green-600">
                {workStats.completed}
              </div>
              <div className="text-xs text-gray-600">Concluídas</div>
            </CardContent>
          </Card>

          <Card className="stat-card-leirisonda stat-card-primary">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-blue-600">
                {workStats.myWorks}
              </div>
              <div className="text-xs text-gray-600">Minhas Obras</div>
            </CardContent>
          </Card>
        </div>

        {/* Navegação Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WorkManagementNavigation currentUser={currentUser} />
          </div>

          {/* Painel de Informações Rápidas */}
          <div className="space-y-4">
            <Card className="card-leirisonda">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Resumo Rápido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">
                        Obras Pendentes
                      </span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">
                      {workStats.pending}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">
                        Necessitam Atribuição
                      </span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {workStats.pending}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">
                        Taxa de Conclusão
                      </span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {workStats.total > 0
                        ? Math.round(
                            (workStats.completed / workStats.total) * 100,
                          )
                        : 0}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="card-leirisonda">
              <CardHeader>
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {hasPermission(currentUser, "create_works") && (
                  <Button
                    size="sm"
                    onClick={() => navigate("/create-work")}
                    className="w-full btn-leirisonda text-xs"
                  >
                    Criar Nova Obra
                  </Button>
                )}

                {hasPermission(currentUser, "assign_works") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/gestao-utilizadores-obras")}
                    className="w-full text-xs"
                  >
                    Gerir Atribuições
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/atribuicao-obras")}
                  className="w-full text-xs"
                >
                  Sistema Avançado
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="w-full text-xs"
                >
                  Ver Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Informações do Utilizador */}
            <Card className="card-leirisonda bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-sm text-blue-900">
                  Informações da Sessão
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-blue-800 space-y-2">
                <div>
                  <strong>Utilizador:</strong> {currentUser.name}
                </div>
                <div>
                  <strong>Departamento:</strong> {currentUser.department}
                </div>
                <div>
                  <strong>Permissões:</strong> {currentUser.permissions.length}
                </div>
                <div>
                  <strong>Última atividade:</strong>{" "}
                  {new Date().toLocaleTimeString("pt-PT")}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
