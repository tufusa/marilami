import { WorkerEntrypoint } from "cloudflare:workers";
import { log } from "./feature/log";
import { updateOrDelay } from "./feature/updateOrDelay";

log("Marilami is up");

export default class extends WorkerEntrypoint<Env> {
  fetch() {
    return new Response("Marilami is up.");
  }

  scheduled() {
    this.ctx.waitUntil(updateOrDelay(this.env));
  }

  updateOrDelay() {
    this.ctx.waitUntil(updateOrDelay(this.env));
  }
}
