import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Plus,
  Settings,
  Users,
  Waves,
  ChevronDown,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Plus,
      label: "Nova Obra",
      path: "/create-work",
    },
    {
      icon: Waves,
      label: "Manutenção Piscinas",
      path: "/pool-maintenance",
    },
  ];

  const adminItems = [
    {
      icon: Users,
      label: "Utilizadores",
      path: "/users",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-leirisonda-primary">
          Leirisonda
        </h1>
        <p className="text-sm text-gray-600">Gestão de Obras</p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-leirisonda-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Administração Section */}
        <div className="mt-8">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Administração
          </div>
          <div className="mt-2 space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-leirisonda-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
}
