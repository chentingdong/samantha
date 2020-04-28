import uuid from 'uuid';

export class User {
  readonly id: string = uuid.v4();
  name: string;
  email?: string;
  
  constructor(name: string, email?: string) {
    this.name = name;
    if (email) this.email = email;
  }
}
