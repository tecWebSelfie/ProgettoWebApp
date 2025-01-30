import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession, Session, User } from "next-auth";

interface UserVisibleData {
  id?: string;
  nickname: string;
  surname?: string;
  scope: string; //used by genericAuth to define the user's role
}

declare module "next-auth/jwt" {
  interface JWT extends JWT, UserVisibleData {}
}

declare module "next-auth" {
  interface User extends DefaultSession["user"], UserVisibleData {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: User;
  }
}
