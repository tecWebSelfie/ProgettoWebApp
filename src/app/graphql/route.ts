import { auth } from "@/auth";
import { yoga } from "./yogaServer";

const routeHandler = auth(async (request) => {
  console.log(request.auth?.user);
  return await yoga.handle(request);
});

export { routeHandler as GET, routeHandler as POST, routeHandler as OPTIONS };
