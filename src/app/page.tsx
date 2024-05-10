import { getServerAuthSession } from "~/server/auth";
import SampleItem from "./_components/SampleItem";
import FilterDates from "./_components/FilterDates";
import { parseDates } from "~/lib/utils";

import dynamic from "next/dynamic";
import AddSample from "./_components/AddSample";
import { getSamples } from "~/server/api/temps";

const Chart = dynamic(() => import("./_components/charts/tempsByDay"), {
  ssr: false,
});

type Props = {
  searchParams?: { from?: string; to?: string };
};

const Home = async ({ searchParams }: Props) => {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <main className="flex items-center justify-center">
        <p>Login to access your data.</p>
      </main>
    );
  }
  const data = await getSamples(parseDates({ searchParams }));
  if (session) {
    return (
      <main className="flex grow flex-col gap-4 bg-c1 py-2 md:p-5">
        <FilterDates />
        <Chart data={data} />
        <AddSample />
        <ul className="flex flex-col gap-2">
          {data.reverse().map((item) => (
            <SampleItem key={item.id} item={item} />
          ))}
        </ul>
      </main>
    );
  }
};

export default Home;
