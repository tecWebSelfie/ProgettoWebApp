import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "./src/**/*.tsx",
  ignoreNoDocuments: true,

  verbose: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: ["typescript-react-apollo"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
