import NextAuth, { Session, User } from "next-auth";
import Credentials, { CredentialInput } from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { userModel } from "./src/db/models/user";
import { JWT } from "next-auth/jwt";
import { authLogger, logger } from "./lib/pinoConfig";
import { emailSchema, passwordSchema } from "./src/validator";

export const credentialsValidator = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: { signIn: "/login", newUser: "/" },
  debug: process.env.NODE_ENV == "development",
  callbacks: {
    /**
    called when the jwt (the session token containing user info) is created or updated.
    Returned jwt is forwarded to session as parameters.
    Jwt is ciphered and you have to use secret to read it.
    */
    async jwt({ user, token }: { user: User; token: JWT }) {
      if (user) {
        token.scope = user.scope;
        token.nickname = user.nickname;
        token.surname = user.surname;
        token.id = user.id;
      }
      return token;
    },
    // here you return session Object whit infos that you want to pass to the client. Be careful!
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.scope = token.scope;
      session.user.nickname = token.nickname;
      session.user.surname = token.surname;
      session.user.id = token.id;
      // authLogger.info({ session, token }, "during session callback");
      // console.log("token: " + token.scope);
      // console.log("session: " + session.user.scope);
      return session;
    },
    // authorized(params) {
    // autherization condition that gets called in middleware
    // },
    // signIn(params) {
    // you have request params, and from them you can choose if you want to continue signIn flow
    // },
    // redirect(params) {
    // here you have to return callback url
    // },
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "mario.rossi@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: dbAuthentication,
      /*async authorize(credentials) {
        // Add your logic to validate credentials here
        const user = await validateCredentials(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
          
      },
      */
    }),
  ],
});

async function dbAuthentication(
  credentials: Partial<Record<"email" | "password", string>>,
  request: Request,
): Promise<User | null> {
  const validatedCredentials = credentialsValidator.safeParse(credentials);

  if (!validatedCredentials.success) {
    console.log("auth.ts" + validatedCredentials.error.message);
    return null;
  } else {
    const userDoc = await userModel
      .findOne({ email: validatedCredentials.data.email })
      .exec();

    if (
      userDoc &&
      (await bcrypt.compare(
        validatedCredentials.data.password,
        userDoc.password,
      ))
    ) {
      /*
      const userDoc = await userModel
        .findOne({ id: credentialDoc.userId })
        .exec();
      */

      return {
        email: userDoc.email,
        name: userDoc.username,
        image: "pippo",
        id: userDoc.id,
        scope: "read:user",
      };

      //return null;
    } else return null;
    //return {email : credentialsValidator.safeParse({email : credentials.email}).data?.email};
  }
}
/*
async function fakeAuth(
  credentials: Partial<Record<"email" | "password", unknown>>,
  request: Request
): Promise<User> {
  return {
    email: "mario.rossi@gmail.com",
    name: "Mario",
    surname: "Rossi",
    nickname: "Pippide",
    id: "1",
    scope: "read:default",
  };
}
*/
