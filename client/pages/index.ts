// Auto-generated placeholder pages
import React from "react";

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

export const CreateWork: React.FC = () => <PlaceholderPage title="Create Work" />;
export const EditWork: React.FC = () => <PlaceholderPage title="Edit Work" />;
export const CreateUser: React.FC = () => <PlaceholderPage title="Create User" />;
export const UsersList: React.FC = () => <PlaceholderPage title="Users List" />;
export const EditUser: React.FC = () => <PlaceholderPage title="Edit User" />;
export const UserDataManager: React.FC = () => <PlaceholderPage title="User Data Manager" />;
export const PoolMaintenancePage: React.FC = () => <PlaceholderPage title="Pool Maintenance" />;
export const MaintenanceList: React.FC = () => <PlaceholderPage title="Maintenance List" />;
export const CreateMaintenance: React.FC = () => <PlaceholderPage title="Create Maintenance" />;
export const MaintenanceDetail: React.FC = () => <PlaceholderPage title="Maintenance Detail" />;
export const CreateIntervention: React.FC = () => <PlaceholderPage title="Create Intervention" />;
export const MobileDeploy: React.FC = () => <PlaceholderPage title="Mobile Deploy" />;
export const NotFound: React.FC = () => (
  <div className="text-center py-12">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
    <p className="text-gray-600">Page not found</p>
  </div>
);