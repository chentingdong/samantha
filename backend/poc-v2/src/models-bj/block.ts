export class Block {
  readonly id: string;
  name: string;
  description?: string;
  
  constructor(id: string, name: string, description?: string) {
    this.id = id;
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