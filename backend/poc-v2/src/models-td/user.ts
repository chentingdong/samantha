import {Context} from './context'

export class User {
  readonly id: string;
  name: string;
  email?: string;

  constructor(id: string, name: string, email?: string) {
    this.id = id;
    this.name = name;
    if (email) this.email = email;
  }

  static login = () => {
    const context = Context.getInstance()
    context.set('isAuthenticated', true);
  }
}
