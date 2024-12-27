import dayjs, { Dayjs } from "dayjs";

import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a",
  date: "DD MMM YYYY",
  time: "h:mm a",
  split: {
    dateTime: "DD/MM/YYYY h:mm a",
    date: "DD/MM/YYYY",
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a",
    date: "DD-MM-YYYY",
  },
};

export const today = (format?: string) => {
  return dayjs(new Date()).startOf("day").format(format);
};

export const formatDateTime = (date: DatePickerFormat, format?: string) => {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
};

export const formatDate = (date: DatePickerFormat, format?: string) => {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.date)
    : "Invalid time value";
};

export const formatTime = (date: DatePickerFormat, format?: string) => {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.time)
    : "Invalid time value";
};

export const formatTimestamp = (date: DatePickerFormat) => {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).valueOf() : "Invalid time value";
};

export const formatToNow = (date: DatePickerFormat) => {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid ? dayjs(date).toNow(true) : "Invalid time value";
};
