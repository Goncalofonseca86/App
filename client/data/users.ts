export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "manager" | "technician" | "supervisor";
  department: string;
  permissions: string[];
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export const defaultUsers: User[] = [
  // Administrador Máximo
  {
    id: "admin1",
    name: "Gonçalo Fonseca",
    email: "gongonsilva@gmail.com",
    password: "19867gsf",
    role: "admin",
    department: "Administração",
    permissions: [
      "create_works",
      "assign_works",
      "manage_users",
      "view_reports",
      "manage_system",
    ],
    phone: "+351 912 000 000",
    createdAt: "2024-01-01",
    lastLogin: new Date().toISOString(),
    isActive: true,
  },

  // Utilizador Limitado
  {
    id: "user1",
    name: "Alexandre Fernandes",
    email: "alexkanaryta@gmail.com",
    password: "69alexandre",
    role: "technician",
    department: "Operações",
    permissions: [
      "view_works",
      "edit_works",
      "view_pools",
      "edit_pools",
      "view_pool_maintenance",
      "edit_pool_maintenance",
      "create_pool_maintenance",
    ],
    phone: "+351 912 000 001",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T09:00:00Z",
    isActive: true,
  },
];

export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case "admin":
      return "Administrador";
    case "manager":
      return "Gestor";
    case "supervisor":
      return "Supervisor";
    case "technician":
      return "Técnico";
    default:
      return role;
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "manager":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "supervisor":
      return "bg-green-100 text-green-800 border-green-200";
    case "technician":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPermissionDisplayName = (permission: string): string => {
  switch (permission) {
    case "create_works":
      return "Criar Obras";
    case "assign_works":
      return "Atribuir Obras";
    case "manage_users":
      return "Gerir Utilizadores";
    case "view_reports":
      return "Ver Relatórios";
    case "manage_system":
      return "Gerir Sistema";
    case "manage_technicians":
      return "Gerir Técnicos";
    case "supervise_works":
      return "Supervisionar Obras";
    case "view_works":
      return "Ver Obras";
    case "edit_works":
      return "Editar Obras";
    case "update_work_status":
      return "Atualizar Estado";
    case "view_pools":
      return "Ver Piscinas";
    case "edit_pools":
      return "Editar Piscinas";
    case "view_pool_maintenance":
      return "Ver Manutenções";
    case "edit_pool_maintenance":
      return "Editar Manutenções";
    case "create_pool_maintenance":
      return "Criar Manutenções";
    default:
      return permission;
  }
};

// Função para autenticar utilizador
export const authenticateUser = (
  email: string,
  password: string,
): User | null => {
  const user = defaultUsers.find(
    (u) => u.email === email && u.password === password && u.isActive,
  );
  if (user) {
    // Simular atualização do último login
    user.lastLogin = new Date().toISOString();
  }
  return user || null;
};

// Função para verificar permissões
export const hasPermission = (user: User, permission: string): boolean => {
  return user.permissions.includes(permission) || user.role === "admin";
};
