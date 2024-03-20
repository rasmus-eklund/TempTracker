"use client";
import { useRouter } from "next/navigation";
import { dateToString } from "../utils/formatData";
import { useState } from "react";
import Button from "./Button";
import { type FromTo } from "~/zodSchemas";

const FilterDates = () => {
  const router = useRouter();

  const changeDate = ({ from, to }: FromTo) => {
    router.push(`/?from=${dateToString(from)}&to=${dateToString(to)}`);
  };

  const firstDayOfThisMonth = new Date();
  const lastDayOfThisMonth = new Date(
    firstDayOfThisMonth.getFullYear(),
    firstDayOfThisMonth.getMonth() + 1,
    0,
  );
  firstDayOfThisMonth.setDate(1);
  const [filter, setFilter] = useState<FromTo>({
    from: firstDayOfThisMonth,
    to: lastDayOfThisMonth,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changeDate(filter);
      }}
      className="flex flex-col gap-2 rounded-md bg-c3 p-3"
    >
      <div className="flex items-center justify-between">
        <label htmlFor="start-date">Från</label>
        <input
          id="start-date"
          type="date"
          className="px-1"
          value={dateToString(filter.from)}
          onChange={({ target: { value } }) =>
            setFilter((p) => ({ ...p, from: new Date(value) }))
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="end-date">Till</label>
        <input
          id="end-date"
          type="date"
          value={dateToString(filter.to)}
          onChange={({ target: { value } }) =>
            setFilter((p) => ({ ...p, to: new Date(value) }))
          }
        />
      </div>
      <Button callToAction type="submit">
        Ok
      </Button>
    </form>
  );
};

export default FilterDates;
