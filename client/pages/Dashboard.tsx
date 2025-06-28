import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Building2,
  Users,
  Waves,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dashboard-hero">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/90">Sistema de Gestão Leirisonda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stat-card-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Obras
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-leirisonda-primary">24</div>
            <p className="text-xs text-muted-foreground">
              +2 desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilizadores Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-leirisonda-secondary">
              12
            </div>
            <p className="text-xs text-muted-foreground">+1 esta semana</p>
          </CardContent>
        </Card>

        <Card className="stat-card-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Obras Concluídas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">33% do total</p>
          </CardContent>
        </Card>

        <Card className="stat-card-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Progresso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">16</div>
            <p className="text-xs text-muted-foreground">67% do total</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-leirisonda-primary" />
                  <span className="text-sm">
                    Nova obra criada: Piscina Vila Nova
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">2h atrás</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-leirisonda-secondary" />
                  <span className="text-sm">
                    Utilizador registrado: João Silva
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">5h atrás</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2">
                  <Waves className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    Manutenção concluída: Piscina Centro
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  1 dia atrás
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    Obra finalizada: Quintal Moderno
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  2 dias atrás
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              className="w-full bg-leirisonda-primary hover:bg-leirisonda-primary/90"
            >
              <Link to="/create-work" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Nova Obra
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/create-user" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Adicionar Utilizador
              </Link>
            </Button>
            <Button
              asChild
              className="w-full bg-leirisonda-secondary hover:bg-leirisonda-secondary/90"
            >
              <Link
                to="/create-maintenance"
                className="flex items-center gap-2"
              >
                <Waves className="h-4 w-4" />
                Agendar Manutenção
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/mobile-deploy" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Deploy Mobile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Manutenções Próximas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Manutenções Programadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">
                Piscina Residencial A
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Limpeza e tratamento químico
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Amanhã, 14:00</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">
                Complexo Piscinas Centro
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Verificação de equipamentos
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Sexta, 09:30</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">
                Piscina Hotel Luxury
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Manutenção completa
              </p>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Segunda, 08:00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
