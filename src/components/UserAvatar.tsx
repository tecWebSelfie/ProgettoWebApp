import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";

export async function UserAvatar() {
  const session = await auth();
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage src={session.user.image ?? undefined} alt="Profile Badge" />
      <AvatarFallback>
        {session.user.name?.charAt(0) ||
          "" + (session.user.name?.split(" ", 2)[1]?.charAt(0) || "")}
      </AvatarFallback>
    </Avatar>
  );
}
