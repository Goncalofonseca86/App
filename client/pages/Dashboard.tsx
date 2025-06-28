import React from "react";

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="dashboard-hero">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/90">Welcome to Leirisonda Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card-leirisonda stat-card-primary">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Works
          </h3>
          <p className="text-3xl font-bold text-leirisonda-primary">24</p>
        </div>

        <div className="stat-card-leirisonda stat-card-secondary">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-leirisonda-secondary">12</p>
        </div>

        <div className="stat-card-leirisonda stat-card-success">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Completed
          </h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>

        <div className="stat-card-leirisonda stat-card-warning">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            In Progress
          </h3>
          <p className="text-3xl font-bold text-yellow-600">16</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-leirisonda">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-700">New work created</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-700">User registered</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Maintenance completed</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="card-leirisonda">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="btn-leirisonda w-full">Create New Work</button>
            <button className="btn-leirisonda-secondary w-full">
              Add User
            </button>
            <button className="btn-leirisonda w-full">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
