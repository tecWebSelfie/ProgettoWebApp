import NextAuth, { User } from "next-auth";
import Credentials, { CredentialInput } from "next-auth/providers/credentials";
import { z } from "zod";
import { credentialModel } from "./src/db/models/credential";
import bcrypt from "bcrypt";
import { userModel } from "./src/db/models/user";

export const credentialsValidator = z.object({
  email: z.string().email("Email doesn't have an email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?!password$|1234$|qwerty$).+$/,
      "Password must not contain known weak words (es. '1234','password')",
    )
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV == "development",
  callbacks: {
    /**
    called when the jwt (the session token containing user info) is created or updated.
    Returned jwt is forwarded to session as parameters.
    Jwt is ciphered and you have to use secret to read it.
    */
    async jwt({ user, token }) {
      if (user) {
        token.scope = user.scope;
      }
      return token;
    },
    // here you return session Object whit infos that you want to pass to the client. Be careful!
    async session({ session, token }) {
      session.user.scope = token.scope;
      console.log("session callback ");
      console.log("token: " + token.scope);
      console.log("session: " + session.user.scope);
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
      authorize: fakeAuth,
    }),
  ],
});

async function dbAuthentication(
  credentials: Partial<Record<"email" | "password", unknown>>,
  request: Request,
) {
  const validatedCredentials = credentialsValidator.safeParse(credentials);

  if (!validatedCredentials.success) {
    console.log("auth.ts" + validatedCredentials.error.message);
    return null;
  } else {
    const credentialDoc = await credentialModel
      .findOne({ email: validatedCredentials.data.email })
      .exec();

    if (
      credentialDoc &&
      (await bcrypt.compare(
        validatedCredentials.data.password,
        credentialDoc.password,
      ))
    ) {
      const userDoc = await userModel
        .findOne({ id: credentialDoc.userId })
        .exec();

      if (userDoc) {
        return {
          email: userDoc.email,
          name: userDoc.nickname,
          image: userDoc.photo.toString(),
          id: userDoc.id,
          scope: "read:user",
        };

        //return null;
      } else return null;
    } else return null;
    //return {email : credentialsValidator.safeParse({email : credentials.email}).data?.email};
  }
}

async function fakeAuth(
  credentials: Partial<Record<"email" | "password", unknown>>,
  request: Request,
) {
  return {
    email: "pippo@gmail.com",
    name: "Mario Rossi",
    id: "1",
    scope: "read:default",
  };
}
