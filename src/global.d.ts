declare namespace NodeJS {
  interface ProcessEnv {
    readonly TOKEN: string;
    readonly GUILD_ID: string;
    readonly DATA_PATH: string;
  }
}
