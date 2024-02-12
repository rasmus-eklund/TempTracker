import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Home = async () => {
  noStore();
  const session = await getServerAuthSession();

  if (session) {
    return (
      <main className="flex">
        <Link href={"/temps/add"}>Add</Link>
        <Link href={"/temps/view"}>View</Link>
      </main>
    );
  }

  return <main className="flex"></main>;
};

export default Home;
