import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import WorkAssignment from "./pages/WorkAssignment";
import Dashboard from "./pages/Dashboard";
import CreateWork from "./pages/CreateWork";
import Login from "./pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/create-work"
          element={
            <Layout>
              <CreateWork />
            </Layout>
          }
        />
        <Route
          path="/atribuicao-obras"
          element={
            <Layout>
              <WorkAssignment />
            </Layout>
          }
        />
        <Route
          path="/work-assignment"
          element={
            <Layout>
              <WorkAssignment />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
