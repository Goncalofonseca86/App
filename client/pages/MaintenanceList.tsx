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
  Waves,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
} from "lucide-react";

interface Maintenance {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: "agendada" | "em_progresso" | "concluida" | "pendente";
  type: string;
  technician: string;
  priority: "baixa" | "media" | "alta";
}

const mockMaintenances: Maintenance[] = [
  {
    id: "1",
    title: "Piscina Residencial A",
    location: "Vila Nova de Gaia",
    date: "2024-01-15",
    time: "14:00",
    status: "agendada",
    type: "Limpeza e tratamento químico",
    technician: "João Silva",
    priority: "media",
  },
  {
    id: "2",
    title: "Complexo Piscinas Centro",
    location: "Porto Centro",
    date: "2024-01-12",
    time: "09:30",
    status: "em_progresso",
    type: "Verificação de equipamentos",
    technician: "Maria Santos",
    priority: "alta",
  },
  {
    id: "3",
    title: "Piscina Hotel Luxury",
    location: "Maia",
    date: "2024-01-10",
    time: "08:00",
    status: "concluida",
    type: "Manutenção completa",
    technician: "Pedro Costa",
    priority: "alta",
  },
  {
    id: "4",
    title: "Piscina Condomínio Verdant",
    location: "Matosinhos",
    date: "2024-01-18",
    time: "16:00",
    status: "agendada",
    type: "Análise química da água",
    technician: "Ana Rodrigues",
    priority: "baixa",
  },
];

const statusConfig = {
  agendada: {
    label: "Agendada",
    color: "bg-blue-100 text-blue-800",
    icon: Calendar,
  },
  em_progresso: {
    label: "Em Progresso",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  concluida: {
    label: "Concluída",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  pendente: {
    label: "Pendente",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

const priorityConfig = {
  baixa: { color: "bg-gray-100 text-gray-800" },
  media: { color: "bg-orange-100 text-orange-800" },
  alta: { color: "bg-red-100 text-red-800" },
};

export const MaintenanceList: React.FC = () => {
  const [filter, setFilter] = useState<string>("todas");

  const filteredMaintenances = mockMaintenances.filter((maintenance) => {
    if (filter === "todas") return true;
    return maintenance.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Waves className="h-8 w-8 text-leirisonda-primary" />
            Manutenção de Piscinas
          </h1>
          <p className="text-gray-600 mt-1">
            Gerir todas as manutenções e intervenções nas piscinas
          </p>
        </div>
        <Button
          asChild
          className="bg-leirisonda-primary hover:bg-leirisonda-primary/90"
        >
          <Link to="/create-maintenance" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Manutenção
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "todas", label: "Todas" },
              { key: "agendada", label: "Agendadas" },
              { key: "em_progresso", label: "Em Progresso" },
              { key: "concluida", label: "Concluídas" },
              { key: "pendente", label: "Pendentes" },
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
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{mockMaintenances.length}</p>
              </div>
              <Waves className="h-8 w-8 text-leirisonda-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendadas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    mockMaintenances.filter((m) => m.status === "agendada")
                      .length
                  }
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
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
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    mockMaintenances.filter((m) => m.status === "em_progresso")
                      .length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    mockMaintenances.filter((m) => m.status === "concluida")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance List */}
      <div className="grid gap-4">
        {filteredMaintenances.map((maintenance) => {
          const StatusIcon = statusConfig[maintenance.status].icon;

          return (
            <Card
              key={maintenance.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {maintenance.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={priorityConfig[maintenance.priority].color}
                        >
                          {maintenance.priority.toUpperCase()}
                        </Badge>
                        <Badge
                          className={statusConfig[maintenance.status].color}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[maintenance.status].label}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{maintenance.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(maintenance.date).toLocaleDateString(
                            "pt-PT",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{maintenance.time}</span>
                      </div>
                      <div>
                        <span className="font-medium">Técnico:</span>{" "}
                        {maintenance.technician}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-medium">Tipo:</span>{" "}
                      {maintenance.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/maintenance/${maintenance.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                    {maintenance.status !== "concluida" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/edit-maintenance/${maintenance.id}`}>
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

      {filteredMaintenances.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Waves className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma manutenção encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Não há manutenções com o filtro selecionado.
            </p>
            <Button asChild>
              <Link to="/create-maintenance">
                <Plus className="h-4 w-4 mr-2" />
                Criar Nova Manutenção
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
