import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        background: "linear-gradient(135deg, #007784, #00a0b0)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>🏊‍♂️ Leirisonda</h1>
      <p>Sistema de Gestão de Obras e Piscinas</p>
      <p>Aplicação limpa e pronta para desenvolvimento!</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement && !rootElement._reactRoot) {
  const root = ReactDOM.createRoot(rootElement);
  (rootElement as any)._reactRoot = root;
  root.render(<App />);
}
