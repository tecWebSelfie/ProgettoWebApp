import type { CodegenConfig } from "@graphql-codegen/cli";

const scalars = {
  MongoID: {
    input: "string | number",
    output: "string | number",
  },
  Buffer: {
    input: "Buffer",
    output: "Buffer",
  },
  Date: {
    input: "Date",
    output: "Date",
  },
  RegExpAsString: {
    input: "string",
    output: "string",
  },
};

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
      config: {
        strictScalars: true,
        scalars,
      },
    },
    "./src/gql/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        resolverTypeWrapperSignature: "Promise<T>",
        contextType: "../app/graphql/context#YogaContext",
        strictScalars: true,
        scalars,
        mappers: {
          Message: "@/db/models/message#IMessage",
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
