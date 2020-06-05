import { User } from "./user";
import { Block, State } from './block';
export class CompositeBlock extends Block {
  blocks: Block[] = [];
  public addBlock(block: Block) {
    this.blocks.push(block);
  }
  public listActiveBlocks(): Block[] {
    return this.blocks.filter((block) => block.state == State.ACTIVE);
  }
  public getSurface(user: User): any {
    const surface = super.getSurface(user);
    if (this.requestors.includes(user)) {
      delete surface.blocks;
    }
    return surface;
  }
}

export class SequentialCompositeBlock extends CompositeBlock { }

export class ParallelCompositeBlock extends CompositeBlock { }
