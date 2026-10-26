import fs from "node:fs";
import http from "node:http";
import path from "node:path";
const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
};
http
  .createServer((req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname
      );
      if (!pathname.startsWith("/portfolio-magang/")) {
        res.writeHead(404).end();
        return;
      }
      let file = path.resolve(
        root,
        pathname.slice("/portfolio-magang/".length)
      );
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
    } catch {
      res.writeHead(400).end();
    }
  })
  .listen(4173, "127.0.0.1", () =>
    console.log("Static preview: http://127.0.0.1:4173/portfolio-magang/")
  );
