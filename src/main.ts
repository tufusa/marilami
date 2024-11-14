import { update } from "./feature/bot";
import { log } from "./feature/log";

log("Marilami is up");

export interface Env {
  TOKEN: string;
  GUILD_ID: string;
  CHANNEL_ID: string;
  NAME: string;
  ACTION: string;
  DOOMSDAY: string;
}

const handler: ExportedHandler<Env> = {
  fetch: async () => {
    return new Response("Marilami is up.");
  },
  scheduled: (_controller, env, ctx) => {
    return ctx.waitUntil(update(env));
  },
};

export default handler;
