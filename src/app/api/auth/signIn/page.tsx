import { signIn } from "@/auth";

export async function SignIn() {
  return (
    <>
      <div>Sign in</div> <button onClick={await signIn()}></button>
    </>
  );
}
