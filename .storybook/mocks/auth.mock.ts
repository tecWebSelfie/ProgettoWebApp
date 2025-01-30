import type { Session } from "next-auth";

console.log("ciao baby");

export const auth: () => Promise<Session> = async () => {
  return await {
    expires: "2026-10-10T00:00:00.000Z",
    user: {
      email: "mario.rossi@gmail.com",
      name: "Mario Rossi",
      image: "dwjij",
      id: "1234567890",
    },
  };
};
