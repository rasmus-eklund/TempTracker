import { type Sample } from "~/zodSchemas";
import SampleItem from "./SampleItem";

type Props = { data: Sample[] };

const SampleList = ({ data }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {data
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((item) => (
          <SampleItem key={item.id} item={item} />
        ))}
    </ul>
  );
};

export default SampleList;
