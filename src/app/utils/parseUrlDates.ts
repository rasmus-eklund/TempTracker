import { fromToSchema, type FromTo } from "~/zodSchemas";

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};
const parseSearch = ({ searchParams }: Props): FromTo => {
  const parsed = fromToSchema.safeParse(searchParams);
  if (!parsed.success) {
    return { from: new Date("2000-01-01"), to: new Date() };
  }
  return parsed.data;
};

export default parseSearch;
