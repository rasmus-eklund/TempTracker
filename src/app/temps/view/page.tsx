import { api } from "~/trpc/server";
import PlotTemp from "./_components/PlotTemp";
import TableTemp from "./_components/TableTemp";

const ViewPage = async () => {
  const data = await api.temp.read.query();
  console.log(data);
  return (
    <main>
      <PlotTemp data={data} />
      <TableTemp data={data} />
    </main>
  );
};

export default ViewPage;
