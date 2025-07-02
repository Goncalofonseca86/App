import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  ClipboardList,
  Settings,
  UserCheck,
  Building,
  ArrowRight,
} from "lucide-react";
import { User as UserType, hasPermission } from "../data/users";

interface WorkManagementNavigationProps {
  currentUser: UserType;
  showTitle?: boolean;
  compact?: boolean;
}

interface NavigationOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  permission?: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function WorkManagementNavigation({
  currentUser,
  showTitle = true,
  compact = false,
}: WorkManagementNavigationProps) {
  const navigate = useNavigate();

  const navigationOptions: NavigationOption[] = [
    {
      title: "Criar Nova Obra",
      description: "Definir detalhes e atribuir utilizadores a uma nova obra",
      icon: <Plus className="w-5 h-5" />,
      route: "/create-work",
      permission: "create_works",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Gestão de Atribuições",
      description: "Atribuir e gerir utilizadores nas obras existentes",
      icon: <UserCheck className="w-5 h-5" />,
      route: "/gestao-utilizadores-obras",
      permission: "assign_works",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Atribuição de Obras",
      description: "Sistema de atribuição avançada com gestão de carga",
      icon: <ClipboardList className="w-5 h-5" />,
      route: "/atribuicao-obras",
      permission: "assign_works",
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Dashboard Principal",
      description: "Visão geral do sistema e estatísticas",
      icon: <Building className="w-5 h-5" />,
      route: "/dashboard",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  ];

  const availableOptions = navigationOptions.filter((option) =>
    option.permission ? hasPermission(currentUser, option.permission) : true,
  );

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Gestão de Obras e Utilizadores
          </h2>
          <p className="text-gray-600">
            Escolha uma das opções disponíveis para gerir obras e atribuições
          </p>
        </div>
      )}

      <div
        className={`grid gap-4 ${compact ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {availableOptions.map((option) => (
          <Card
            key={option.route}
            className={`transition-all hover:shadow-md cursor-pointer ${option.borderColor} ${option.bgColor}`}
            onClick={() => navigate(option.route)}
          >
            <CardContent className={`${compact ? "p-4" : "p-6"}`}>
              <div className="flex items-start gap-4">
                <div
                  className={`${option.color} p-2 rounded-lg ${option.bgColor}`}
                >
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${option.color} mb-1`}>
                    {option.title}
                  </h3>
                  {!compact && (
                    <p className="text-sm text-gray-600 mb-3">
                      {option.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {option.permission && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${option.color} ${option.borderColor}`}
                      >
                        Permissão: {option.permission.replace("_", " ")}
                      </Badge>
                    )}
                    <ArrowRight className={`w-4 h-4 ${option.color} ml-auto`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas do Utilizador */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-900">
                  {currentUser.name}
                </div>
                <div className="text-sm text-blue-700">
                  {currentUser.department}
                </div>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              {currentUser.role === "admin"
                ? "Administrador"
                : currentUser.role === "manager"
                  ? "Gestor"
                  : currentUser.role === "supervisor"
                    ? "Supervisor"
                    : "Técnico"}
            </Badge>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="text-sm text-blue-700">
              <strong>Permissões disponíveis:</strong>{" "}
              {currentUser.permissions.length} de{" "}
              {
                [
                  "create_works",
                  "assign_works",
                  "manage_users",
                  "view_reports",
                  "manage_system",
                ].length
              }
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentUser.permissions.slice(0, 3).map((permission) => (
                <Badge
                  key={permission}
                  variant="outline"
                  className="text-xs bg-blue-100 text-blue-800 border-blue-300"
                >
                  {permission.replace("_", " ")}
                </Badge>
              ))}
              {currentUser.permissions.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-100 text-blue-800 border-blue-300"
                >
                  +{currentUser.permissions.length - 3} mais
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
