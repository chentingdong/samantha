import { CompositeBlock } from "./composite-block";
import { Context } from "./context";

export class Request extends CompositeBlock {
  context: Context = new Context();
}
