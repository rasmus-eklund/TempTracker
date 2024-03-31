import { getServerAuthSession } from "~/server/auth";
import { Login } from "./Auth";
import UserCard from "./UserCard";
import { getUser } from "../admin/_components/GetUser";

const NavBar = async () => {
  const session = await getServerAuthSession();
  if (session) {
    const user = await getUser(session.user.id);
    if (user?.role) {
      session.user.role = user.role;
    }
  }
  return (
    <header className="flex items-center justify-between bg-c3 p-4">
      <h1>TempTracker</h1>
      {session ? <UserCard user={session.user} /> : <Login />}
    </header>
  );
};

export default NavBar;
