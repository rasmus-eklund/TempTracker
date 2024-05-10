import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Icon from "~/icons/Icon";
import { Login, Logout } from "./Auth";
import { getServerAuthSession } from "~/server/auth";

const NavMenu = async () => {
  const session = await getServerAuthSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Icon icon="hamburgerMenu" className="size-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session && session.user.role === "admin" ? (
          <>
            <DropdownMenuItem asChild>
              <Link href={"/admin"}>Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem>{session ? <Logout /> : <Login />}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavMenu;
