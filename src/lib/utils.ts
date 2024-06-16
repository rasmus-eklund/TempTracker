import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Sample } from "~/zodSchemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const formattedDate =
    year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  return formattedDate;
};

export const dateToString = (date: Date) => {
  return date.toLocaleString("sv-SE", { dateStyle: "short" });
};

export const averageByDate = (data: Sample[]): Sample[] => {
  const groupedData = data.reduce(
    (acc, curr) => {
      const date = dateToString(curr.date);
      if (!acc[date]) {
        acc[date] = [curr];
      } else {
        acc[date]?.push(curr);
      }
      return acc;
    },
    {} as Record<string, Sample[]>,
  );
  return Object.values(groupedData).map((samples) => {
    const sum = samples.reduce((acc, curr) => acc + curr.temp, 0);
    const count = samples.length;
    return {
      id: samples[0]!.id,
      date: samples[0]!.date,
      temp: sum / count,
    };
  });
};
