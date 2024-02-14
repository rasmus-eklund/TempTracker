export type Data = { date: Date; temp: number };
export const generateDefaultTempAndDate = ({
  data,
}: {
  data?: Data;
}): { date: string; temp: number } => {
  if (!data) {
    return {
      date: formatDate(new Date()),
      temp: 36.6,
    };
  }
  return { date: formatDate(data.date), temp: data.temp };
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const formattedDate =
    year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
  return formattedDate;
};
