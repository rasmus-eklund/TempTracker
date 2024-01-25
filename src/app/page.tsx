import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import Login from "./_components/login";

const Home = async () => {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex">
      {session ? <p>{session.user.name}</p> : <Login />}
    </main>
  );
};

export default Home;
