"use client";
import { type ReactNode, useState } from "react";
import { formatDate } from "./generateDefaultTempAndDate";

type Filter = {
  start: Date;
  end: Date;
};
type Props = {
  children: ({ filter }: { filter: Filter }) => ReactNode;
};

const FilterDates = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    start: new Date("1970-01-01"),
    end: new Date(),
  });

  return (
    <div>
      <form className="flex gap-2 rounded-md bg-c3 p-3">
        <label htmlFor="start-date">From</label>
        <input
          id="start-date"
          type="date"
          className="px-1"
          value={formatDate(filter.start)}
          onChange={({ target: { value } }) =>
            setFilter((p) => ({ ...p, start: new Date(value) }))
          }
        />

        <label htmlFor="end-date">To</label>
        <input
          id="end-date"
          value={formatDate(filter.end)}
          onChange={({ target: { value } }) =>
            setFilter((p) => ({ ...p, end: new Date(value) }))
          }
        />
      </form>
      {children({ filter })}
    </div>
  );
};

export default FilterDates;
