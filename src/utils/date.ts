import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import httpContext from "express-http-context";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 *
 * @param dateString yyyy-mm-dd
 */
export const toDayjs = (dateString: string): Dayjs => {
  const timezone = httpContext.get("timezone") ?? "UTC";
  const dayjsOfTimezone = dayjs.tz(dateString, timezone);
  return dayjsOfTimezone.utc();
};

export const toDayjsFromDate = (date: Date): Dayjs => {
  return dayjs(date);
};

export const toDayjsWithTimezone = (dayjs: Dayjs): Dayjs => {
  const timezone = httpContext.get("timezone") ?? "UTC";
  return dayjs.tz(timezone);
};

export const toDayjsFromDateWithTimezone = (date: Date): Dayjs => {
  const timezone = httpContext.get("timezone") ?? "UTC";
  return dayjs.tz(date, timezone);
};
