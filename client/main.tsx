import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkAssignment from "./pages/WorkAssignment";
import Dashboard from "./pages/Dashboard";
import CreateWork from "./pages/CreateWork";
import WorkUserManagement from "./pages/WorkUserManagement";
import WorkManagementHub from "./pages/WorkManagementHub";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-work" element={<CreateWork />} />
        <Route path="/atribuicao-obras" element={<WorkAssignment />} />
        <Route path="/work-assignment" element={<WorkAssignment />} />
        <Route
          path="/gestao-utilizadores-obras"
          element={<WorkUserManagement />}
        />
        <Route path="/work-user-management" element={<WorkUserManagement />} />
        <Route path="/gestao-obras" element={<WorkManagementHub />} />
        <Route path="/work-management" element={<WorkManagementHub />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
