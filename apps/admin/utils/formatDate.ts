import { format } from "date-fns";

const isoDateToString = (isoDate: string): string => {
  const formattedDate = format(isoDate, "MMddyyyy");
  return formattedDate;
};

export { isoDateToString };
