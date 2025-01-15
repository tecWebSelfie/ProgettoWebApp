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
import { ProfileBadge } from "./ProfileBadge";
import { TimeMachine } from "./TimeMachine";

export function AppBar() {
  return (
    <div className="flex p-2 justify-between border-solid shadow-md rounded">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationBarButton href="/calendar">
              <CiCalendar />
              <span className="hidden sm:inline">Calendar</span>
            </NavigationBarButton>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationBarButton
              className="bg-yellow-700 hover:bg-yellow-800"
              href="/journal"
            >
              <BsJournalBookmarkFill />
              <span className="hidden sm:inline">Journal</span>
            </NavigationBarButton>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationBarButton
              href="/pomodoro"
              className="bg-red-700 hover:bg-red-800"
            >
              <GiTomato />
              <span className="hidden sm:inline">Pomodoro</span>
            </NavigationBarButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3 items-center">
        <TimeMachine />
        <DarkModeToggle />
        <ProfileBadge />
      </div>
    </div>
  );
}
