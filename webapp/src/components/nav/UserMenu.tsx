"use client";

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar color="secondary" size="sm" name={user.displayName?.charAt(0)} />
          {user.displayName}
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="edit" as={Link} href={`/profiles/${user.id}`}>Edit Profile</DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
