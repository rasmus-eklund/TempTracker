import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PlotTemp from "./_components/PlotTemp";
import Sample from "./_components/Sample";
import AddTempButton from "./_components/AddTempButton";
const Home = async () => {
  noStore();
  const session = await getServerAuthSession();
  const data = await api.temp.read.query();

  if (session) {
    return (
      <main className="bg-c1 flex max-w-4xl flex-col gap-4 p-5 grow">
        <PlotTemp data={data.sort((a, b) => Number(a.date) - Number(b.date))} />
        <AddTempButton />
        <ul className="flex flex-col gap-2">
          {data
            .sort((a, b) => Number(b.date) - Number(a.date))
            .map((item) => (
              <Sample key={crypto.randomUUID()} item={item} />
            ))}
        </ul>
      </main>
    );
  }

  return <main className="flex"></main>;
};

export default Home;
