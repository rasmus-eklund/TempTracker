import { getServerAuthSession } from "~/server/auth";
import { Login } from "./Auth";
import UserCard from "./UserCard";

const Header = async () => {
  const session = await getServerAuthSession();
  return (
    <header className="flex items-center justify-between bg-c3 p-4">
      <h1>WamPerature</h1>
      {session ? <UserCard user={session.user} /> : <Login />}
    </header>
  );
};

export default Header;
