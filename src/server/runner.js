const { execSync } = require("child_process");
process.chdir("webapp/src/ProgettoWebApp/");
execSync("PORT=8000 npm run dev", { stdio: "inherit", cwd: process.cwd() });
