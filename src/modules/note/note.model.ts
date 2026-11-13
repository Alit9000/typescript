import { User } from "../user/user.model";
import type { IAuthor } from "../../index";

export class Note implements IAuthor {
  public static nextId: number = 1;

  public id: number;
  public title: string;
  public content: string;

  public author: User;

  constructor(title: string, content: string, author: User) {
    this.id = Note.nextId++;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  preview(): string {
    const maxLength = 60;
    if (this.content.length <= maxLength) {
      return this.content;
    }
    return this.content.slice(0, maxLength).replace(/\s+$/, "") + "...";
  }

  displayInfo(): void {
    console.log("\n---------------- Note Info ----------------");
    console.log(`ID:      ${this.id}`);
    console.log(`Title:   ${this.title}`);
    console.log(`Content: ${this.content}`);
    console.log(`Preview: ${this.preview()}`);
    console.log(`Author:  ${this.author.name} (${this.author.email})`);
    console.log("-------------------------------------------");
  }

  getAuthorInfo(): string {
    return `Note "${this.title}" authored by ${this.author.name}`;
  }
}
