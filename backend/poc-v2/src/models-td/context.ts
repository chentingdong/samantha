import uuid from 'uuid';

// Context singleton
export class Context {
  private static instance: Context = new Context();

  readonly id: string = uuid.v4();
  isAuthenticated?: boolean;
  user?: object;

  private constructor () {
    if (!Context.instance) {
      Context.instance = this;
    }
    return Context.instance;
  }

  public static getInstance (): Context {
    return this.instance;
  }

  set(key:string, value: any) {
    this[key] = value
  }
}

