import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// day.jsのTimezone機能を有効化
dayjs.extend(utc);
dayjs.extend(timezone);

export const getNow = () => dayjs().tz("Asia/Tokyo");

export const getDate = dayjs;
