import { signIn } from "@/auth";

export default async function SignIn() {
  await signIn();
  return (
    <>
      <div className="m-2">
        <form
          action={async () => {
            "use server";
            await signIn("credentials");
          }}
        >
          <input
            className="block my-2"
            type="email"
            placeholder="mario.rossi@gmail.com"
          />
          <input className="block my-2" type="password" />
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
}
