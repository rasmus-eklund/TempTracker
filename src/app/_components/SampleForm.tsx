"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { tempSchema, type Temp } from "~/zodSchemas";
import Button from "./Button";
import {
  type Data,
  generateDefaultTempAndDate,
} from "./generateDefaultTempAndDate";

type Props = {
  data?: Data;
  onSubmit: (data: Data) => void;
  disabled: boolean;
  onCancel: () => void;
};
const SampleForm = ({ data, onSubmit, disabled, onCancel }: Props) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-md border border-black bg-c1 p-5"
    >
      <h2 className="text-center text-2xl">Edit measurement</h2>
      <div className="grid grid-cols-2 gap-2">
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
          type="datetime-local"
          {...register("date")}
          defaultValue={date}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <div className="flex justify-evenly gap-4">
        <Button onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button callToAction type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SampleForm;
