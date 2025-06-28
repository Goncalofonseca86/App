import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import {
  Building2,
  Users,
  Waves,
  Home,
  Plus,
  Settings,
  LogOut,
  FileText,
  Wrench,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Obras",
    icon: Building2,
    items: [
      { title: "Lista de Obras", url: "/works" },
      { title: "Nova Obra", url: "/create-work" },
    ],
  },
  {
    title: "Utilizadores",
    icon: Users,
    items: [
      { title: "Lista de Utilizadores", url: "/users" },
      { title: "Novo Utilizador", url: "/create-user" },
      { title: "Gestão de Dados", url: "/user-data" },
    ],
  },
  {
    title: "Manutenção de Piscinas",
    icon: Waves,
    items: [
      { title: "Lista de Manutenções", url: "/pool-maintenance" },
      { title: "Nova Manutenção", url: "/create-maintenance" },
    ],
  },
  {
    title: "Deploy Mobile",
    url: "/mobile-deploy",
    icon: FileText,
  },
];

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActiveRoute = (url: string) => {
    return location.pathname === url;
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-leirisonda-primary" />
            <div>
              <h1 className="text-lg font-bold text-leirisonda-primary">
                Leirisonda
              </h1>
              <p className="text-xs text-gray-500">Gestão de Obras</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {sidebarItems.map((item) => (
            <SidebarGroup key={item.title}>
              {item.items ? (
                <>
                  <SidebarGroupLabel className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActiveRoute(subItem.url)}
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              ) : (
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(item.url!)}
                    >
                      <Link to={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-6">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Bem-vindo, {user?.name}</span>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
