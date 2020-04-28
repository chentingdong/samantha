import uuid from "uuid";
export class Block {
  readonly id: string = uuid.v4();
  name: string;
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    if (description) this.description = description;
  }
}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {

}

export class RequestBlock extends Block {

}