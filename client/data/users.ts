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
  // Administradores
  {
    id: "admin1",
    name: "Carlos Mendes",
    email: "admin@leirisonda.pt",
    password: "admin123",
    role: "admin",
    department: "Administração",
    permissions: [
      "create_works",
      "assign_works",
      "manage_users",
      "view_reports",
      "manage_system",
    ],
    phone: "+351 912 345 678",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T10:30:00Z",
    isActive: true,
  },

  // Gestores
  {
    id: "manager1",
    name: "Ana Ferreira",
    email: "ana.ferreira@leirisonda.pt",
    password: "manager123",
    role: "manager",
    department: "Operações",
    permissions: [
      "create_works",
      "assign_works",
      "view_reports",
      "manage_technicians",
    ],
    phone: "+351 912 345 679",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T09:15:00Z",
    isActive: true,
  },
  {
    id: "manager2",
    name: "Paulo Santos",
    email: "paulo.santos@leirisonda.pt",
    password: "manager123",
    role: "manager",
    department: "Manutenção",
    permissions: ["create_works", "assign_works", "view_reports"],
    phone: "+351 912 345 680",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-14T16:45:00Z",
    isActive: true,
  },

  // Supervisores
  {
    id: "supervisor1",
    name: "Teresa Costa",
    email: "teresa.costa@leirisonda.pt",
    password: "supervisor123",
    role: "supervisor",
    department: "Qualidade",
    permissions: ["assign_works", "view_reports", "supervise_works"],
    phone: "+351 912 345 681",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T08:00:00Z",
    isActive: true,
  },

  // Técnicos (já existentes na atribuição de obras)
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@leirisonda.pt",
    password: "tech123",
    role: "technician",
    department: "Sistemas de Filtração",
    permissions: ["view_works", "update_work_status"],
    phone: "+351 912 345 682",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T07:30:00Z",
    isActive: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@leirisonda.pt",
    password: "tech123",
    role: "technician",
    department: "Instalações Elétricas",
    permissions: ["view_works", "update_work_status"],
    phone: "+351 912 345 683",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T08:15:00Z",
    isActive: true,
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@leirisonda.pt",
    password: "tech123",
    role: "technician",
    department: "Reparações Mecânicas",
    permissions: ["view_works", "update_work_status"],
    phone: "+351 912 345 684",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-14T18:00:00Z",
    isActive: true,
  },

  // Outros utilizadores
  {
    id: "user1",
    name: "Rita Oliveira",
    email: "rita.oliveira@leirisonda.pt",
    password: "user123",
    role: "supervisor",
    department: "Atendimento",
    permissions: ["view_works", "create_works"],
    phone: "+351 912 345 685",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15T09:30:00Z",
    isActive: true,
  },
  {
    id: "user2",
    name: "Miguel Rodrigues",
    email: "miguel.rodrigues@leirisonda.pt",
    password: "user123",
    role: "technician",
    department: "Instalações",
    permissions: ["view_works", "update_work_status"],
    phone: "+351 912 345 686",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-13T17:30:00Z",
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
    case "update_work_status":
      return "Atualizar Estado";
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
