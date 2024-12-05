import { createHandler } from "graphql-sse";
import { schema } from "@/db/gqlschema";

export const sseServer = createHandler({ schema });
