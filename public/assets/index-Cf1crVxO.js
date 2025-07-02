// Loader para aplicação Leirisonda
(function () {
  // Criar script tag para carregar o JS original
  const script = document.createElement("script");
  script.type = "module";
  script.crossOrigin = "true";
  script.src = "/leirisonda-deploy/assets/index-Cf1crVxO.js";

  // Criar link tag para carregar o CSS original
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.crossOrigin = "true";
  link.href = "/leirisonda-deploy/assets/index-DHnQ0z6C.css";

  // Adicionar ao head
  document.head.appendChild(link);
  document.head.appendChild(script);
})();
