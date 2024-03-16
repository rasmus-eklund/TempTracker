import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PlotTemp from "./_components/PlotTemp";
import Sample from "./_components/Sample";
import AddTempButton from "./_components/AddTempButton";

const Home = async () => {
  noStore();
  const session = await getServerAuthSession();
  if (session) {
    return <View />;
  }
  return (
    <main className="flex items-center justify-center">
      <p>Login to access your data.</p>
    </main>
  );
};

const View = async () => {
  const data = await api.temp.read.query();
  return (
    <main className="flex grow flex-col gap-4 bg-c1 p-5">
      <PlotTemp data={data} />
      <AddTempButton />
      <ul className="flex flex-col gap-2">
        {data.reverse().map((item) => (
          <Sample key={crypto.randomUUID()} item={item} />
        ))}
      </ul>
    </main>
  );
};

export default Home;
