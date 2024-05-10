import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fromToSchema, type FromTo } from "~/zodSchemas";

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
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};
export const parseSearch = ({ searchParams }: Props): FromTo => {
  const parsed = fromToSchema.safeParse(searchParams);
  if (!parsed.success) {
    return { from: new Date("2000-01-01"), to: new Date() };
  }
  return parsed.data;
};
