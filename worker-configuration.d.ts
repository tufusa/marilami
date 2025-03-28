interface Env {
  // Private vars
  TOKEN: string;
  GUILD_ID: string;
  CHANNEL_ID: string;
  NAME: string;
  ACTION: string;
  ACTION_EUPHONIC_TE: string;
  DOOMSDAY: string;

  // Public vars
  CRON: string;
  MAX_DELAY_MS: number;

  // Bindings
  SELF: Service<import("./src/main").default>;
}
