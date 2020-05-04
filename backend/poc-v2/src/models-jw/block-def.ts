export abstract class BlockDef {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract execute(): void;
}
