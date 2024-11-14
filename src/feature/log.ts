import { getNow } from "./dayjs";

export const log = (message: string): void => {
  const now = getNow();
  const timestamp = `${now.format("YYYY-MM-DDTHH:mm:ss.SSS")}`;

  console.log(`[${timestamp}] ${message}`);
};
