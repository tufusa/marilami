import type { Clock } from "./clock";

export const getClock = (env: Env): DurableObjectStub<Clock> => {
  const id = env.CLOCK.idFromName("clock");
  const clock = env.CLOCK.get(id);
  return clock;
};
