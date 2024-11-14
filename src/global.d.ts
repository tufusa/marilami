declare namespace NodeJS {
  interface ProcessEnv {
    readonly TOKEN: string;
    readonly GUILD_ID: string;
    readonly CHANNEL_ID: string;
    readonly NAME: string;
    readonly ACTION: string;
    readonly DOOMSDAY: string;
  }
}
