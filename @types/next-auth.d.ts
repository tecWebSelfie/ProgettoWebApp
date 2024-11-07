import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    scope: string;
  }
}

// declare module "next-auth" {
//     interface User extends DefaultSession["user"] {
//         scope: string; //used by genericAuth to define the user's role
//     };

//     interface Session extends DefaultSession["user"] {
//         user: User;
//     }
// }

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    scope: string; //used by genericAuth to define the user's role
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: User;
  }
}
