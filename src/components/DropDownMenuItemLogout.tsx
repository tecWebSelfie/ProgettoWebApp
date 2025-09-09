"use client";

import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { logOut } from "../serverActions/logOut";
import { IoMdExit } from "react-icons/io";

export function DropDownMenuItemLogout() {
  const handleLogout = async () => {
    await logOut();
    location.reload(); // Reload the page to reflect the logout state
  };
  return (
    <div>
      <DropdownMenuItem onClick={handleLogout}>
        Logout
        <DropdownMenuShortcut>
          <IoMdExit size={22} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </div>
  );
}
