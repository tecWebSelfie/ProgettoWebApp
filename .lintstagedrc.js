const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*": "prettier --check --ignore-unknown",
  "*.{t|j}s?(x)": [buildEslintCommand],
};

// module.exports = {
//   '*.{js,jsx,ts,tsx}': ,
// }
