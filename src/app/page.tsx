import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Sample from "./_components/Sample";
import FilterDates from "./_components/FilterDates";
import parseSearch from "./utils/parseUrlDates";

import dynamic from "next/dynamic";
import AddTemp from "./_components/AddTemp";
import { createSample } from "~/server/api/temps";
const Chart = dynamic(() => import("./_components/charts/tempsByDay"), {
  ssr: false,
});

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
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
  const dates = parseSearch({ searchParams });
  const data = await api.temp.read.query(dates);
  if (session) {
    return (
      <main className="flex grow flex-col gap-4 bg-c1 md:p-5 py-2">
        <FilterDates />
        <Chart data={data} />
        <AddTemp submit={createSample} />
        <ul className="flex flex-col gap-2">
          {data.map((item) => (
            <Sample key={item.id} item={item} />
          ))}
        </ul>
      </main>
    );
  }
};

export default Home;
