import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SignUpOrLoginButton } from "./SignUpOrLoginButton";
import { auth, signIn } from "@/auth";

export async function ProfileBadge() {
  const session = await auth();
  return (
    <div className="flex gap-3 items-center">
      {!session && <SignUpOrLoginButton />}
      {session && (
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="Profile Badge" />
          <AvatarFallback>
            {session.user.name?.charAt(0) +
              (session.user.name?.split(" ", 2)[1]?.charAt(0) || "")}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
