import { DurableObject } from "cloudflare:workers";
import { CronExpressionParser } from "cron-parser";
import { update } from "./bot";
import { log } from "./log";

export class Clock extends DurableObject<Env> {
  alarm(): void {
    this.ctx.waitUntil(Promise.all([update(this.env), this.refresh()]));
  }

  async currentAlarm(): Promise<number | undefined> {
    return (await this.ctx.storage.getAlarm()) ?? undefined;
  }

  async refresh(): Promise<void> {
    const interval = CronExpressionParser.parse(this.env.CRON);
    const next = interval.next();
    next.setSeconds(0);
    next.setMilliseconds(0);

    await this.ctx.storage.deleteAlarm();
    await this.ctx.storage.setAlarm(next.getTime());

    log(`Refresh Alarm: ${next.toString()}; ${next.getTime()}`);
  }
}
