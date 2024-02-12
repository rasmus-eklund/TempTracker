import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import Login from "./login";

const Header = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <header className="flex bg-black/80 p-4">
        <h1>WamPerature</h1>
        <Login />
      </header>
    );
  }
  return (
    <header className="flex bg-black/80 p-4">
      {session.user.image ? (
        <Image
          className="h-8 w-8 rounded-full"
          src={session.user.image}
          height={250}
          width={250}
          alt="Profile Picture"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-black"></div>
      )}
    </header>
  );
};

export default Header;
