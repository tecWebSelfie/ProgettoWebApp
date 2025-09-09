import { YogaContext } from "@/src/app/graphql/context";
import { SchemaComposer } from "graphql-compose";

export const schemaComposer = new SchemaComposer<YogaContext>();
