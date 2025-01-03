import { auth } from "@/auth";
import { yoga } from "./yogaServer";
import { dbConfig } from "@/db/dbconfig";
import mongoose from "mongoose";

mongoose.connect(dbConfig.uri);

const routeHandler = auth(async (request) => {
  console.log("I'm in route handler, user is: " + request.auth?.user);
  return await yoga.handle(request);
});

export { routeHandler as GET, routeHandler as POST, routeHandler as OPTIONS };
