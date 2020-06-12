declare module "~nightwatch/nightwatch" {
  export interface NightWatchBrowser {
    setValueSlow: (
      selector: string,
      value: string,
      using?: string
    ) => NightWatchBrowser
  }
}
