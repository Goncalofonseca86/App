import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
  LogOut,
} from "lucide-react";
import {
  User as UserType,
  getRoleDisplayName,
  getRoleColor,
  hasPermission,
} from "../data/users";
import { useNavigate } from "react-router-dom";

interface Work {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  deadline: string;
  status: "pending" | "assigned" | "in_progress" | "completed";
  assignedTo?: string;
}

interface Technician {
  id: string;
  name: string;
  specialization: string;
  currentWorkload: number;
  maxWorkload: number;
  skills: string[];
}

export default function WorkAssignment() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [works, setWorks] = useState<Work[]>([
    {
      id: "1",
      title: "Manutenção de Piscina - Vila Nova",
      description: "Limpeza completa e verificação do sistema de filtração",
      location: "Vila Nova de Gaia",
      priority: "high",
      estimatedHours: 4,
      deadline: "2024-01-15",
      status: "pending",
    },
    {
      id: "2",
      title: "Instalação de Sistema de Aquecimento",
      description: "Instalação de bomba de calor para piscina residencial",
      location: "Porto",
      priority: "medium",
      estimatedHours: 8,
      deadline: "2024-01-20",
      status: "pending",
    },
    {
      id: "3",
      title: "Reparação de Bomba",
      description: "Substituição de componentes da bomba de circulação",
      location: "Matosinhos",
      priority: "high",
      estimatedHours: 3,
      deadline: "2024-01-12",
      status: "assigned",
      assignedTo: "1",
    },
  ]);

  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: "1",
      name: "João Silva",
      specialization: "Sistemas de Filtração",
      currentWorkload: 6,
      maxWorkload: 8,
      skills: ["Filtração", "Limpeza", "Manutenção"],
    },
    {
      id: "2",
      name: "Maria Santos",
      specialization: "Instalações Elétricas",
      currentWorkload: 4,
      maxWorkload: 8,
      skills: ["Elétrica", "Aquecimento", "Automação"],
    },
    {
      id: "3",
      name: "Pedro Costa",
      specialization: "Reparações Mecânicas",
      currentWorkload: 2,
      maxWorkload: 8,
      skills: ["Mecânica", "Bombas", "Tubagem"],
    },
  ]);

  useEffect(() => {
    // Verificar se o utilizador está logado
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const assignWork = (workId: string, technicianId: string) => {
    setWorks((prev) =>
      prev.map((work) =>
        work.id === workId
          ? { ...work, status: "assigned" as const, assignedTo: technicianId }
          : work,
      ),
    );

    setTechnicians((prev) =>
      prev.map((tech) => {
        const work = works.find((w) => w.id === workId);
        return tech.id === technicianId
          ? {
              ...tech,
              currentWorkload:
                tech.currentWorkload + (work?.estimatedHours || 0),
            }
          : tech;
      }),
    );
  };

  const unassignWork = (workId: string) => {
    const work = works.find((w) => w.id === workId);
    if (work?.assignedTo) {
      setTechnicians((prev) =>
        prev.map((tech) =>
          tech.id === work.assignedTo
            ? {
                ...tech,
                currentWorkload: Math.max(
                  0,
                  tech.currentWorkload - work.estimatedHours,
                ),
              }
            : tech,
        ),
      );
    }

    setWorks((prev) =>
      prev.map((w) =>
        w.id === workId
          ? { ...w, status: "pending" as const, assignedTo: undefined }
          : w,
      ),
    );
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

  const getWorkloadPercentage = (current: number, max: number) => {
    return (current / max) * 100;
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

  const canAssignWorks = hasPermission(currentUser, "assign_works");
  const canCreateWorks = hasPermission(currentUser, "create_works");

  return (
    <div className="leirisonda-main">
      {/* Header com informações do utilizador */}
      <div className="dashboard-hero">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Atribuição de Obras
            </h1>
            <p className="text-white/90">
              Gerir e atribuir obras aos técnicos disponíveis
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

      <div className="content-grid">
        {/* Lista de Obras Pendentes */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Obras Disponíveis</h2>
            <div className="space-y-4">
              {works
                .filter((work) => work.status === "pending")
                .map((work) => (
                  <Card key={work.id} className="card-leirisonda">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {work.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {work.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(work.priority)}>
                            {work.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(work.status)}>
                            {work.status === "pending"
                              ? "Pendente"
                              : work.status}
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

                      <div className="flex items-center gap-4">
                        {canAssignWorks ? (
                          <Select
                            onValueChange={(techId) =>
                              assignWork(work.id, techId)
                            }
                          >
                            <SelectTrigger className="w-64">
                              <SelectValue placeholder="Selecionar técnico" />
                            </SelectTrigger>
                            <SelectContent>
                              {technicians
                                .filter(
                                  (tech) =>
                                    tech.currentWorkload +
                                      work.estimatedHours <=
                                    tech.maxWorkload,
                                )
                                .map((tech) => (
                                  <SelectItem key={tech.id} value={tech.id}>
                                    <div>
                                      <div className="font-medium">
                                        {tech.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {tech.specialization} •{" "}
                                        {tech.currentWorkload}/
                                        {tech.maxWorkload}h
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            Sem permissão para atribuir obras
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Obras Atribuídas */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Obras Atribuídas</h2>
            <div className="space-y-4">
              {works
                .filter((work) => work.status === "assigned")
                .map((work) => {
                  const assignedTech = technicians.find(
                    (t) => t.id === work.assignedTo,
                  );
                  return (
                    <Card
                      key={work.id}
                      className="card-leirisonda border-blue-200"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {work.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {work.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(work.priority)}>
                              {work.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(work.status)}>
                              Atribuída
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
                            {new Date(work.deadline).toLocaleDateString(
                              "pt-PT",
                            )}
                          </div>
                        </div>

                        {assignedTech && (
                          <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className="font-medium text-blue-900">
                                  {assignedTech.name}
                                </div>
                                <div className="text-sm text-blue-700">
                                  {assignedTech.specialization}
                                </div>
                              </div>
                            </div>
                            {canAssignWorks && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => unassignWork(work.id)}
                                className="border-red-200 text-red-700 hover:bg-red-50"
                              >
                                Remover Atribuição
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Lista de Técnicos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Técnicos Disponíveis</h2>
          <div className="space-y-4">
            {technicians.map((tech) => {
              const workloadPercentage = getWorkloadPercentage(
                tech.currentWorkload,
                tech.maxWorkload,
              );
              const isOverloaded = workloadPercentage >= 100;

              return (
                <Card
                  key={tech.id}
                  className={`card-leirisonda ${isOverloaded ? "border-red-200" : ""}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                        <CardDescription>{tech.specialization}</CardDescription>
                      </div>
                      <Badge
                        className={
                          isOverloaded
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {isOverloaded ? "Sobrecarregado" : "Disponível"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carga de Trabalho</span>
                          <span>
                            {tech.currentWorkload}/{tech.maxWorkload}h
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${isOverloaded ? "bg-red-500" : "bg-blue-500"}`}
                            style={{
                              width: `${Math.min(workloadPercentage, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">
                          Competências:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {tech.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
