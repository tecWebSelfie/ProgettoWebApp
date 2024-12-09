import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiTomato } from "react-icons/gi";
import { NavigationBarButton } from "./NavigationBarButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignUpOrLoginButton } from "./SignUpOrLoginButton";
import { DarkModeToggle } from "./DarkModeToggle";

export function AppBar() {
  return (
    <div className="p-2 flex w-full justify-between border-solid shadow-md rounded">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button asChild>
              <Link href="/calendar">
                <CiCalendar />
                Calendar
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationBarButton
              className="bg-yellow-700 hover:bg-yellow-800"
              href="/journal"
            >
              <BsJournalBookmarkFill />
              Journal
            </NavigationBarButton>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationBarButton
              href="/pomodoro"
              className="bg-red-700 hover:bg-red-800"
            >
              <GiTomato />
              Pomodoro
            </NavigationBarButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3 items-center">
        <SignUpOrLoginButton />
        <DarkModeToggle />
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
