import { getServerAuthSession } from "~/server/auth";
import FilterDates from "./_components/FilterDates";

import dynamic from "next/dynamic";
import AddSample from "./_components/AddSample";
import { getSamples } from "~/server/api/temps";
import { FILTER_OPTIONS, getRangeOption } from "~/lib/filterDatesOptions";
import SampleList from "./_components/SampleList";

const Chart = dynamic(() => import("./_components/charts/tempsByDay"), {
  ssr: false,
});

type Props = {
  searchParams: { range?: string };
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
  const range = getRangeOption(searchParams.range) ?? FILTER_OPTIONS.lastWeek;
  const data = await getSamples(range);
  if (session) {
    return (
      <main className="flex grow flex-col gap-4 bg-c1 py-2 md:p-5">
        <FilterDates label={range.label}>
          <Chart data={data} />
        </FilterDates>
        <AddSample />
        <SampleList data={data} />
      </main>
    );
  }
};

export default Home;
