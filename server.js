// server.js — run with: node server.js
const http = require("http");
const https = require("https");

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  let body = "";
  req.on("data", d => body += d);
  req.on("end", () => {
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_ANTHROPIC_API_KEY_HERE",  // ← paste your key here
        "anthropic-version": "2023-06-01"
      }
    };
    const proxy = https.request(options, r => {
      res.writeHead(r.statusCode, { "Content-Type": "application/json" });
      r.pipe(res);
    });
    proxy.write(body);
    proxy.end();
  });
}).listen(3000, () => console.log("Bloomberg Terminal backend running on http://localhost:3000"));
