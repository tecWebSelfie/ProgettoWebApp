import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: [
    "./src/**/*.tsx",
    "!./src/**/Apollo.tsx",
    //"!./src/**/localGql/**/*.{ts,tsx}",
  ],

  ignoreNoDocuments: true,

  verbose: true,
  debug: true,
  generates: {
    "src/gql/": {
      schema: "./clientSchema.graphql",
      preset: "client",
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
