import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SignUpOrLoginButton } from "./SignUpOrLoginButton";
import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";
import { DropDownMenuItemLogout } from "./DropDownMenuItemLogout";
import { Separator } from "./ui/separator";
import { IoSettingsOutline } from "react-icons/io5";

export async function ProfileBadge() {
  const session = await auth();
  return (
    <div className="flex gap-3 items-center">
      {!session && <SignUpOrLoginButton />}
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.jpg" alt="Profile Badge" />
              <AvatarFallback>
                {session.user.name?.charAt(0) +
                  (session.user.name?.split(" ", 2)[1]?.charAt(0) || "")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>
                  <IoSettingsOutline size={22} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <Separator />
            <DropDownMenuItemLogout />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
