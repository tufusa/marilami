declare namespace NodeJS {
  interface ProcessEnv {
    readonly TOKEN: string;
    readonly DATA_PATH: string;
    readonly GUILD_ID: string;
    readonly CHANNEL_ID: string;
  }
}
