import { schema } from "@/db/gqlschema";
import { createHandler } from "graphql-sse/lib/use/http";

export const sseServer = createHandler({ schema });
