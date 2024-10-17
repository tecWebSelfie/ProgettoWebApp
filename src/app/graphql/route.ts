import mongoose, { mongo } from "mongoose";
import { auth } from "@/auth";
import { yoga } from "./yogaServer";

const routeHandler = auth(async (request) => {
  await yoga.handleRequest(request, null);
});

export { routeHandler as GET, routeHandler as POST, routeHandler as OPTIONS };

// export async function GET(request: NextRequest) {
//   return app.handle(request);
// }

// export async function POST(request: NextRequest) {
//   return app.handle(request);
// }
