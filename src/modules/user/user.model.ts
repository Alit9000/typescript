import { NoteBook } from "../notebook/notebook.model";
import type { IAuthor } from "../../index";

export abstract class Person {
  protected id: number;
  protected name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  abstract displayInfo(): void;
}

export class User extends Person implements IAuthor {
  public id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age: number;
  protected role: string;

  public notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name);
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this._age = age;
    this.role = "User";
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error(`Invalid age ${value}: age must be between 18 and 60.`);
    }
    this._age = value;
  }

  public getPassword(): string {
    return this.password;
  }

  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  public removeNotebook(notebook: NoteBook): void {
    const index = this.notebooks.indexOf(notebook);
    if (index !== -1) {
      this.notebooks.splice(index, 1);
    }
  }

  displayInfo(): void {
    console.log("\n================ User Info ================");
    console.log(`ID:        ${this.id}`);
    console.log(`Name:      ${this.name}`);
    console.log(`Email:     ${this.email}`);
    console.log(`Phone:     ${this.phone}`);
    console.log(`Age:       ${this._age}`);
    console.log(`Role:      ${this.role}`);
    console.log(`Notebooks: ${this.notebooks.length} owned`);
    this.notebooks.forEach((nb) => console.log(`  - "${nb.title}" (ID: ${nb.id})`));
    console.log("===========================================");
  }

  getAuthorInfo(): string {
    return `Author [User]: ${this.name} <${this.email}>`;
  }
}
