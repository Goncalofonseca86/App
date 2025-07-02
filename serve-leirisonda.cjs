#!/usr/bin/env node

const http = require("http");
const fs = require("fs");
const path = require("path");

const DEPLOY_DIR = "./leirisonda-deploy";
const PORT = 8080;

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(DEPLOY_DIR, filePath);

  // Security check
  if (!filePath.startsWith(path.resolve(DEPLOY_DIR))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error serving ${filePath}:`, err.message);
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    const mimeType = getMimeType(filePath);
    res.writeHead(200, {
      "Content-Type": mimeType,
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
});

server.listen(PORT, "::", () => {
  console.log(`🎉 Leirisonda server running at:`);
  console.log(`➜  Local:   http://localhost:${PORT}/`);
  console.log(`➜  Network: http://[::]:${PORT}/`);
  console.log(`📁 Serving: ${path.resolve(DEPLOY_DIR)}`);
});
