export class Storage<T> {
  private items: T[] = [];

  async addItem(item: T): Promise<void> {
    this.items.push(item);
  }

  async removeItem(item: T): Promise<void> {
    const index = this.items.findIndex((existing) => existing === item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  async getAllItems(): Promise<T[]> {
    return [...this.items];
  }

  get count(): number {
    return this.items.length;
  }
}
