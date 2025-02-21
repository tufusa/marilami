import { update } from "./feature/bot";
import { log } from "./feature/log";

log("Marilami is up");

const handler: ExportedHandler<Env> = {
  fetch: async (_controller) => {
    return new Response("Marilami is up.");
  },
  scheduled: async (_controller, env, ctx) => {
    ctx.waitUntil(update(env));
  },
};

export default handler;
