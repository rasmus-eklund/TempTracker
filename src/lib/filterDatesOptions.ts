import { startOfDay, subDays } from "date-fns";

export const FILTER_OPTIONS = {
  lastWeek: {
    label: "Last Week",
    from: startOfDay(subDays(new Date(), 6)),
    to: null,
  },
  lastMonth: {
    label: "Last Month",
    from: startOfDay(subDays(new Date(), 29)),
    to: null,
  },
  lastThreeMonth: {
    label: "Last Three Months",
    from: startOfDay(subDays(new Date(), 89)),
    to: null,
  },
  lastYear: {
    label: "Last Year",
    from: startOfDay(subDays(new Date(), 364)),
    to: null,
  },
  all: { label: "All Time", from: null, to: null },
};

export const getRangeOption = (range?: string) => {
  if (!range) return;
  return FILTER_OPTIONS[range as keyof typeof FILTER_OPTIONS];
};
