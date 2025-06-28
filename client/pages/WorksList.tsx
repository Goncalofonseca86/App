import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Plus,
  Building2,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Euro,
  Users,
} from "lucide-react";

interface Work {
  id: string;
  title: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "planeamento" | "em_progresso" | "concluida" | "pausada";
  type: string;
  budget: number;
  progress: number;
  manager: string;
}

const mockWorks: Work[] = [
  {
    id: "1",
    title: "Construção Piscina Residencial",
    client: "João Santos",
    location: "Vila Nova de Gaia",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    status: "em_progresso",
    type: "Construção Nova",
    budget: 25000,
    progress: 65,
    manager: "Carlos Silva",
  },
  {
    id: "2",
    title: "Renovação Piscina Hotel",
    client: "Hotel Luxury",
    location: "Porto Centro",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    status: "planeamento",
    type: "Renovação",
    budget: 45000,
    progress: 15,
    manager: "Maria Costa",
  },
  {
    id: "3",
    title: "Piscina Condomínio",
    client: "Condomínio Verdant",
    location: "Matosinhos",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    status: "concluida",
    type: "Construção Nova",
    budget: 65000,
    progress: 100,
    manager: "Pedro Ferreira",
  },
  {
    id: "4",
    title: "Reparação Sistema Filtragem",
    client: "Centro Desportivo",
    location: "Maia",
    startDate: "2024-01-20",
    endDate: "2024-02-05",
    status: "pausada",
    type: "Reparação",
    budget: 8500,
    progress: 40,
    manager: "Ana Rodrigues",
  },
];

const statusConfig = {
  planeamento: {
    label: "Planeamento",
    color: "bg-gray-100 text-gray-800",
    icon: Clock,
  },
  em_progresso: {
    label: "Em Progresso",
    color: "bg-blue-100 text-blue-800",
    icon: Building2,
  },
  concluida: {
    label: "Concluída",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  pausada: {
    label: "Pausada",
    color: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle,
  },
};

export const WorksList: React.FC = () => {
  const [filter, setFilter] = useState<string>("todas");

  const filteredWorks = mockWorks.filter((work) => {
    if (filter === "todas") return true;
    return work.status === filter;
  });

  const totalBudget = mockWorks.reduce((acc, work) => acc + work.budget, 0);
  const avgProgress =
    mockWorks.reduce((acc, work) => acc + work.progress, 0) / mockWorks.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-8 w-8 text-leirisonda-primary" />
            Gestão de Obras
          </h1>
          <p className="text-gray-600 mt-1">
            Acompanhar todas as obras e projetos em curso
          </p>
        </div>
        <Button
          asChild
          className="bg-leirisonda-primary hover:bg-leirisonda-primary/90"
        >
          <Link to="/create-work" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Obra
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "todas", label: "Todas" },
              { key: "planeamento", label: "Planeamento" },
              { key: "em_progresso", label: "Em Progresso" },
              { key: "concluida", label: "Concluídas" },
              { key: "pausada", label: "Pausadas" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total de Obras
                </p>
                <p className="text-2xl font-bold">{mockWorks.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-leirisonda-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Em Progresso
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockWorks.filter((w) => w.status === "em_progresso").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Orçamento Total
                </p>
                <p className="text-2xl font-bold text-green-600">
                  €{totalBudget.toLocaleString()}
                </p>
              </div>
              <Euro className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Progresso Médio
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {avgProgress.toFixed(0)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Works List */}
      <div className="grid gap-4">
        {filteredWorks.map((work) => {
          const StatusIcon = statusConfig[work.status].icon;

          return (
            <Card key={work.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {work.title}
                      </h3>
                      <Badge className={statusConfig[work.status].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[work.status].label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          <strong>Cliente:</strong> {work.client}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{work.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4" />
                        <span>
                          <strong>Orçamento:</strong> €
                          {work.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(work.startDate).toLocaleDateString("pt-PT")}{" "}
                          -{new Date(work.endDate).toLocaleDateString("pt-PT")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          <strong>Gestor:</strong> {work.manager}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Tipo:</span> {work.type}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progresso</span>
                        <span>{work.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-leirisonda-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${work.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/works/${work.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                    {work.status !== "concluida" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/edit-work/${work.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredWorks.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma obra encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Não há obras com o filtro selecionado.
            </p>
            <Button asChild>
              <Link to="/create-work">
                <Plus className="h-4 w-4 mr-2" />
                Criar Nova Obra
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
