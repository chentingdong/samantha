import uuid from "uuid";
import {tomorrow} from "./utils";
export class Block {
  readonly id: string = uuid.v4();
  name: string;
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    if (description) this.description = description;
  }

  messageRequester() {}

  messageResponder() {}
}

export class UIBlock extends Block {

}

export class CompositeBlock extends Block {
  constructor(name: string, description?: string) {
    super(name, description);
  }

  dueDate: Date = tomorrow();
  followUpDays: number = 1;
  requester: string = '';
  responder: string = '';
}

export class RequestBlock extends Block {
  constructor(name: string, description?: string) {
    super(name, description);
  }

  requestId: string = '';

}