const createServer = require("http").createServer;
const parse = require("url").parse;
const path = require("path");
const next = require("next");

process.chdir(path.join(__dirname, "../"));

/**
 * Loads environment variables from multiple .env files, with later files overriding earlier ones.
 * This allows for a hierarchy of environment-specific configuration files.
 * The loaded environment variables are made available to the application through `process.env`.
 */
require("dotenv").configDotenv({
  path: [".env", ".env.local", ".env.production", ".env.production.local"],
  override: true,
});

//put this in e .env.local file on the host, DON'T push an .env. to repo 
const dev = process.env.ERCOLANI_DEV || false;
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT) || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
