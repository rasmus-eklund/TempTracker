"use client";
import { type RouterOutputs } from "~/trpc/shared";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dateToString } from "~/app/utils/formatData";

type Temp = RouterOutputs["temp"]["read"][number];

const formatTemp = (t: string) => `${t}°C`;

type Props = { data: Temp[] };
const TempsByDay = (props: Props) => {
  const data = props.data.map((i) => ({ ...i, date: dateToString(i.date) }));
  const maxValue = Math.max(...data.map(({temp}) => temp))
  return (
    <ResponsiveContainer width="100%" minHeight={200} maxHeight={400}>
      <LineChart data={data} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
        <CartesianGrid  />
        <XAxis
          dataKey="date"
          tickFormatter={(tick: string) =>
            tick.split("-").slice(1).reverse().join("/")
          }
        />
        <YAxis
          allowDecimals={false}
          domain={[
            (dataMin: number) => Math.round(dataMin - 1),
            (dataMax: number) => Math.round(dataMax + 1),
          ]}
          tickFormatter={formatTemp}
        />
        <Tooltip formatter={formatTemp} />
        <Line name="Temperaturer" dataKey="temp" type="monotone" dot={false} />
        <ReferenceLine y={maxValue} stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TempsByDay;
