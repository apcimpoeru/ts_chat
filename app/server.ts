import next from "next";
import http from "http";
import { createSocketServer } from "./socket";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  createSocketServer(server);

  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});