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
  Users,
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Shield,
  User,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  status: "ativo" | "inativo" | "pendente";
  joinDate: string;
  projects: number;
}

const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Gonçalo Silva",
    email: "gongonsilva@gmail.com",
    phone: "+351 912 345 678",
    role: "admin",
    location: "Porto",
    status: "ativo",
    joinDate: "2023-01-15",
    projects: 15,
  },
  {
    id: "2",
    name: "Carlos Silva",
    email: "carlos@leirisonda.pt",
    phone: "+351 913 456 789",
    role: "gestor",
    location: "Vila Nova de Gaia",
    status: "ativo",
    joinDate: "2023-02-20",
    projects: 8,
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@leirisonda.pt",
    phone: "+351 914 567 890",
    role: "tecnico",
    location: "Matosinhos",
    status: "ativo",
    joinDate: "2023-03-10",
    projects: 12,
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro@leirisonda.pt",
    phone: "+351 915 678 901",
    role: "supervisor",
    location: "Maia",
    status: "ativo",
    joinDate: "2023-04-05",
    projects: 6,
  },
  {
    id: "5",
    name: "Ana Rodrigues",
    email: "ana@leirisonda.pt",
    phone: "+351 916 789 012",
    role: "operador",
    location: "Porto Centro",
    status: "pendente",
    joinDate: "2024-01-12",
    projects: 2,
  },
];

const roleConfig = {
  admin: {
    label: "Administrador",
    color: "bg-red-100 text-red-800",
    icon: Shield,
  },
  gestor: { label: "Gestor", color: "bg-blue-100 text-blue-800", icon: Users },
  supervisor: {
    label: "Supervisor",
    color: "bg-purple-100 text-purple-800",
    icon: User,
  },
  tecnico: {
    label: "Técnico",
    color: "bg-green-100 text-green-800",
    icon: User,
  },
  operador: {
    label: "Operador",
    color: "bg-gray-100 text-gray-800",
    icon: User,
  },
};

const statusConfig = {
  ativo: { label: "Ativo", color: "bg-green-100 text-green-800" },
  inativo: { label: "Inativo", color: "bg-gray-100 text-gray-800" },
  pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
};

export const UsersList: React.FC = () => {
  const [filter, setFilter] = useState<string>("todos");

  const filteredUsers = mockUsers.filter((user) => {
    if (filter === "todos") return true;
    if (filter === "ativos") return user.status === "ativo";
    return user.role === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-8 w-8 text-leirisonda-primary" />
            Gestão de Utilizadores
          </h1>
          <p className="text-gray-600 mt-1">
            Gerir colaboradores e permissões de acesso
          </p>
        </div>
        <Button
          asChild
          className="bg-leirisonda-primary hover:bg-leirisonda-primary/90"
        >
          <Link to="/create-user" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Utilizador
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "todos", label: "Todos" },
              { key: "ativos", label: "Ativos" },
              { key: "admin", label: "Administradores" },
              { key: "gestor", label: "Gestores" },
              { key: "tecnico", label: "Técnicos" },
              { key: "supervisor", label: "Supervisores" },
              { key: "operador", label: "Operadores" },
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
                <p className="text-2xl font-bold">{mockUsers.length}</p>
              </div>
              <Users className="h-8 w-8 text-leirisonda-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockUsers.filter((u) => u.status === "ativo").length}
                </p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gestores</p>
                <p className="text-2xl font-bold text-blue-600">
                  {
                    mockUsers.filter(
                      (u) => u.role === "gestor" || u.role === "admin",
                    ).length
                  }
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Técnicos</p>
                <p className="text-2xl font-bold text-purple-600">
                  {
                    mockUsers.filter(
                      (u) => u.role === "tecnico" || u.role === "operador",
                    ).length
                  }
                </p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const RoleIcon =
            roleConfig[user.role as keyof typeof roleConfig]?.icon || User;

          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            roleConfig[user.role as keyof typeof roleConfig]
                              ?.color
                          }
                        >
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {
                            roleConfig[user.role as keyof typeof roleConfig]
                              ?.label
                          }
                        </Badge>
                        <Badge className={statusConfig[user.status].color}>
                          {statusConfig[user.status].label}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                      <div>
                        <span className="font-medium">Projetos:</span>{" "}
                        {user.projects}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-medium">Membro desde:</span>{" "}
                      {new Date(user.joinDate).toLocaleDateString("pt-PT")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/users/${user.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-user/${user.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum utilizador encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Não há utilizadores com o filtro selecionado.
            </p>
            <Button asChild>
              <Link to="/create-user">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Utilizador
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
