import cron from "node-cron";
import { update } from "./feature/bot";
import { log } from "./feature/log";

log("Marilami is up");

cron.schedule("0 0 0 * * *", update);
