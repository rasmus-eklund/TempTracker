import Icon from "~/icons/Icon";
import { type Temp } from "~/zodSchemas";

type Props = {
  data: Temp[];
};
const TableTemp = ({ data }: Props) => {
  return (
    <ul>
      {data.map((data) => (
        <li className="flex" key={crypto.randomUUID()}>
          <p>
            {data.date.toLocaleString("sv-SE", {
              day: "2-digit",
              year: "2-digit",
              month: "2-digit",
            })}
          </p>
          <div className="flex">
            <Icon icon="temp" className="h-6 w-6 fill-slate-700" />
            <p>{data.temp}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TableTemp;
