import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User as UserType,
  getRoleDisplayName,
  getRoleColor,
} from "../data/users";
import { Users, Plus, X, UserCheck, AlertCircle } from "lucide-react";

interface UserAssignmentSelectorProps {
  availableUsers: UserType[];
  selectedUserIds: string[];
  onUserSelect: (userId: string) => void;
  onUserRemove: (userId: string) => void;
  maxUsers?: number;
  allowSelfAssignment?: boolean;
  currentUserId?: string;
  showWorkload?: boolean;
}

interface UserWithWorkload extends UserType {
  currentWorkload?: number;
  maxWorkload?: number;
}

export default function UserAssignmentSelector({
  availableUsers,
  selectedUserIds,
  onUserSelect,
  onUserRemove,
  maxUsers,
  allowSelfAssignment = true,
  currentUserId,
  showWorkload = false,
}: UserAssignmentSelectorProps) {
  const selectedUsers = availableUsers.filter((user) =>
    selectedUserIds.includes(user.id),
  );

  const unselectedUsers = availableUsers.filter(
    (user) =>
      !selectedUserIds.includes(user.id) &&
      (allowSelfAssignment || user.id !== currentUserId),
  );

  const getWorkloadColor = (user: UserWithWorkload) => {
    if (!showWorkload || !user.currentWorkload || !user.maxWorkload) {
      return "text-gray-500";
    }

    const percentage = (user.currentWorkload / user.maxWorkload) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const getWorkloadPercentage = (user: UserWithWorkload) => {
    if (!showWorkload || !user.currentWorkload || !user.maxWorkload) {
      return 0;
    }
    return (user.currentWorkload / user.maxWorkload) * 100;
  };

  const isMaxUsersReached = maxUsers
    ? selectedUserIds.length >= maxUsers
    : false;

  return (
    <Card className="card-leirisonda">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Utilizadores Atribuídos
          {selectedUserIds.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedUserIds.length}
              {maxUsers && ` / ${maxUsers}`}
            </Badge>
          )}
        </CardTitle>
        {maxUsers && (
          <p className="text-sm text-gray-600">
            Pode selecionar até {maxUsers} utilizadores para esta obra
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Utilizadores Selecionados */}
        {selectedUsers.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 text-green-700 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Selecionados ({selectedUsers.length})
            </h4>
            <div className="space-y-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-medium text-green-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-green-700">
                        {user.department}
                        {user.email && (
                          <span className="text-green-600">
                            {" "}
                            • {user.email}
                          </span>
                        )}
                      </div>
                      {showWorkload &&
                        (user as UserWithWorkload).currentWorkload && (
                          <div className="text-xs mt-1">
                            <span
                              className={getWorkloadColor(
                                user as UserWithWorkload,
                              )}
                            >
                              Carga:{" "}
                              {(user as UserWithWorkload).currentWorkload}/
                              {(user as UserWithWorkload).maxWorkload}h (
                              {Math.round(
                                getWorkloadPercentage(user as UserWithWorkload),
                              )}
                              %)
                            </span>
                          </div>
                        )}
                    </div>
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onUserRemove(user.id)}
                    className="border-red-200 text-red-700 hover:bg-red-50 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Utilizadores Disponíveis */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Utilizadores
            <span className="text-sm font-normal text-gray-500">
              ({unselectedUsers.length} disponíveis)
            </span>
          </h4>

          {isMaxUsersReached && (
            <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  Limite máximo de {maxUsers} utilizadores atingido
                </span>
              </div>
            </div>
          )}

          {/* Debug: Mostrar estado do carregamento */}
          {availableUsers.length === 0 && (
            <div className="text-sm text-red-600 mb-3 p-3 bg-red-50 rounded border border-red-200">
              <div className="font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Nenhum utilizador disponível
              </div>
              <div className="text-xs mt-1">
                Verifique se existem utilizadores ativos no sistema
              </div>
            </div>
          )}

          {/* Lista de utilizadores disponíveis */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {unselectedUsers.length > 0 ? (
              unselectedUsers.map((user) => {
                const isOverloaded =
                  showWorkload &&
                  (user as UserWithWorkload).currentWorkload &&
                  (user as UserWithWorkload).maxWorkload &&
                  getWorkloadPercentage(user as UserWithWorkload) >= 90;

                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                      isMaxUsersReached
                        ? "opacity-50 cursor-not-allowed bg-gray-50"
                        : "hover:bg-blue-50 cursor-pointer"
                    } ${isOverloaded ? "border-orange-200 bg-orange-50" : ""}`}
                    onClick={() => !isMaxUsersReached && onUserSelect(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {user.name}
                          {user.id === currentUserId && (
                            <span className="text-xs text-blue-600 ml-2">
                              (Você)
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.department}
                          {user.email && (
                            <span className="text-gray-400">
                              {" "}
                              • {user.email}
                            </span>
                          )}
                        </div>
                        {showWorkload &&
                          (user as UserWithWorkload).currentWorkload && (
                            <div className="text-xs mt-1">
                              <span
                                className={getWorkloadColor(
                                  user as UserWithWorkload,
                                )}
                              >
                                Carga:{" "}
                                {(user as UserWithWorkload).currentWorkload}/
                                {(user as UserWithWorkload).maxWorkload}h (
                                {Math.round(
                                  getWorkloadPercentage(
                                    user as UserWithWorkload,
                                  ),
                                )}
                                %)
                              </span>
                              {isOverloaded && (
                                <span className="text-orange-600 ml-2">
                                  • Sobrecarregado
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleDisplayName(user.role)}
                        </Badge>
                        {isOverloaded && (
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                            ⚠️
                          </Badge>
                        )}
                      </div>
                    </div>
                    {!isMaxUsersReached && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 hover:bg-blue-50 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>
                  {availableUsers.length === 0
                    ? "Nenhum utilizador disponível"
                    : "Todos os utilizadores já foram selecionados"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Resumo da Seleção */}
        {selectedUsers.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <strong>Resumo:</strong> {selectedUsers.length} utilizador
              {selectedUsers.length !== 1 ? "es" : ""} selecionado
              {selectedUsers.length !== 1 ? "s" : ""}
              {showWorkload && (
                <span className="block mt-1">
                  Carga total estimada:{" "}
                  {selectedUsers.reduce(
                    (total, user) =>
                      total + ((user as UserWithWorkload).currentWorkload || 0),
                    0,
                  )}
                  h
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
