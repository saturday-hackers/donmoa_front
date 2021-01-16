import moment from "moment";

export const makeDayId = (dateObj: Date) => {
  return moment(dateObj).format("YYYYMMDD");
};
