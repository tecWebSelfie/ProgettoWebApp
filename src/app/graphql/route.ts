import { handlers, auth } from "@/auth";
import { yoga } from "./yogaServer";
import { NextRequest } from "next/server";

const routeHandler = auth(async (request) => await yoga.handle(request));

export { routeHandler as GET, routeHandler as POST, routeHandler as OPTIONS };
