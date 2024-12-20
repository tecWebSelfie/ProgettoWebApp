"use client";

import { DropdownMenuItem } from "./ui/dropdown-menu";
import { logOut } from "../serverActions/logOut";

export function DropDownMenuItemLogout() {
  return (
    <div>
      <DropdownMenuItem onClick={async () => logOut()}>Logout</DropdownMenuItem>
    </div>
  );
}
