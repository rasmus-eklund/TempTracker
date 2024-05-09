"use client";
import { type RouterOutputs } from "~/trpc/shared";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dateToString } from "~/app/utils/formatData";

type Temp = RouterOutputs["temp"]["read"][number];

const formatTemp = (t: string) => `${t} ° C`;

type Props = { data: Temp[] };
const TempsByDay = (props: Props) => {
  const data = props.data.map((i) => ({ ...i, date: dateToString(i.date) }));
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <LineChart data={data} margin={{ left: 2, right: 2, top: 2, bottom: 2 }}>
        <CartesianGrid />
        <XAxis
          dataKey="date"
          interval={0}
          tickFormatter={(tick: string) =>
            tick.split("-").slice(1).reverse().join("/")
          }
        />
        <YAxis
          domain={[
            (dataMin: number) => Math.round(dataMin - 1),
            (dataMax: number) => Math.round(dataMax + 1),
          ]}
          tickFormatter={formatTemp}
        />
        <Tooltip formatter={formatTemp} />
        <Line
          name="Temperaturer"
          dataKey="temp"
          type="monotone"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TempsByDay;
