"use client";

import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { logOut } from "../serverActions/logOut";
import { IoMdExit } from "react-icons/io";

export function DropDownMenuItemLogout() {
  return (
    <div>
      <DropdownMenuItem onClick={async () => logOut()}>
        Logout
        <DropdownMenuShortcut>
          <IoMdExit size={22} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </div>
  );
}
