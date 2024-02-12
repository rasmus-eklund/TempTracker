"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { tempSchema, type Temp } from "~/zodSchemas";

type Data = { date: Date; temp: number };
type Props = { data?: Data; onSubmit: (data: Data) => void; disabled: boolean };

const generateDefaultTempAndDate = ({
  data,
}: {
  data?: Data;
}): { date: string; temp: number } => {
  if (!data) {
    return {
      date: new Date().toISOString().substring(0, 10),
      temp: 36.6,
    };
  }
  return { date: data.date.toISOString().substring(0, 10), temp: data.temp };
};

const TempForm = ({ data, onSubmit, disabled }: Props) => {
  const { date, temp } = generateDefaultTempAndDate({ data });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Temp>({
    resolver: zodResolver(tempSchema),
  });
  if (disabled) {
    return <ClipLoader />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="grid grid-cols-2">
        <label htmlFor="temp">Temperature</label>
        <input
          id="temp"
          className="border"
          {...register("temp")}
          defaultValue={temp}
        />
        {errors.temp && <p>{errors.temp.message}</p>}
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          {...register("date")}
          defaultValue={date}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default TempForm;
