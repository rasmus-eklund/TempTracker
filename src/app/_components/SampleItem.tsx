import Icon from "~/icons/Icon";
import ConfirmRemoveSample from "./ConfirmRemoveSample";
import type { Sample } from "~/zodSchemas";
import SampleForm from "./SampleForm";
import { editSample } from "~/server/api/temps";

type Props = {
  item: Sample;
};
const SampleItem = ({ item }: Props) => {
  return (
    <li className="flex select-none items-center justify-between gap-2 rounded-md bg-c2 p-2">
      <p>
        {item.date.toLocaleString("sv-SE", {
          day: "2-digit",
          year: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <div className="flex items-center gap-2">
        <Icon icon="temp" className="size-6 fill-c3" />
        <p>{item.temp.toFixed(2)}</p>
        <SampleForm
          {...item}
          submit={async ({ date, temp }) => {
            "use server";
            await editSample({ date, temp, id: item.id });
          }}
        >
          <Icon icon="edit" className="size-6 fill-black" />
        </SampleForm>
        <ConfirmRemoveSample id={item.id} />
      </div>
    </li>
  );
};

export default SampleItem;
