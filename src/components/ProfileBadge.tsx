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
import { AvatarImg } from "@/components/AvatarImg";
import { makeFragmentData } from "@/src/gql";
import { AvatarImgFragmentDoc } from "@/gql/graphql";

export async function ProfileBadge() {
  const session = await auth();
  console.log("profile badge gets this session object: ", session?.user);
  return (
    <div className="flex gap-3 items-center">
      {!session && <SignUpOrLoginButton />}
      {session?.user.id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AvatarImg
              avatarImgFragment={makeFragmentData(
                { ...session.user, _id: session.user.id },
                AvatarImgFragmentDoc,
              )}
            />
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
