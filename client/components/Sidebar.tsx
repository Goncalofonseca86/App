import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Plus,
  Users,
  Waves,
  LogOut,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

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
    {
      icon: Settings,
      label: "Atribuição de Obras",
      path: "/work-assignment",
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
    <div
      className={`${isCollapsed ? "w-16" : "w-64"} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </button>

      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        {!isCollapsed ? (
          <>
            <h1 className="text-xl font-bold text-blue-600">Leirisonda</h1>
            <p className="text-sm text-gray-600">Gestão de Obras</p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              L
            </div>
          </div>
        )}
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
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && item.label}
              </button>
            );
          })}
        </div>

        {/* Administração Section */}
        {!isCollapsed && (
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
                        ? "bg-blue-600 text-white"
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
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        {!isCollapsed && currentUser && (
          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900">
              {currentUser.name}
            </div>
            <div className="text-xs text-gray-500">
              {currentUser.department}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Sair" : ""}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Sair"}
        </button>
      </div>
    </div>
  );
}
