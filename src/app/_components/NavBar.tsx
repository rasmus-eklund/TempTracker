import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import Login from "./Login";

const Header = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <header className="flex items-center justify-between bg-black/80 p-4">
        <h1>WamPerature</h1>
        <Login />
      </header>
    );
  }
  return (
    <header className="bg-c3 flex items-center justify-between p-4">
      {session.user.image ? (
        <Image
          className="h-8 w-8 rounded-full"
          src={session.user.image}
          height={250}
          width={250}
          alt="Profile Picture"
        />
      ) : (
        <div className="bg-c4 h-8 w-8 rounded-full"></div>
      )}
      <h1>{session.user.name}</h1>
    </header>
  );
};

export default Header;
