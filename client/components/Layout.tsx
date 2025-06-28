import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const Layout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="leirisonda-layout">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-leirisonda-primary">
              Leirisonda
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="leirisonda-main">
        <Outlet />
      </main>
    </div>
  );
};
