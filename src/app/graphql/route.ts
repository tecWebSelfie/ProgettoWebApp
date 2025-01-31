import { auth } from "@/auth";
import { yoga } from "./yogaServer";
import { dbConfig } from "@/db/dbconfig";
import mongoose from "mongoose";

console.log(dbConfig.uri);
mongoose.connect(dbConfig.uri).catch((error) => {
  console.error(
    "Mongoose can't connect. Check that you booted up your mongodb ;) ",
    error,
  );
});

const routeHandler = auth(async (request) => {
  console.log("I'm in route handler, user is: " + request.auth?.user.username);
  return await yoga.handle(request);
});

export { routeHandler as GET, routeHandler as POST, routeHandler as OPTIONS };
