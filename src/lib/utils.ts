import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const parseDates = ({
  searchParams,
}: {
  searchParams?: { from?: string; to?: string };
}) => {
  if (searchParams) {
    const { from, to } = searchParams;
    return {
      from: from ? new Date(from) : new Date("2000-01-01"),
      to: to ? new Date(to) : new Date(),
    };
  }
  return { from: new Date("2000-01-01"), to: new Date() };
};
