import { User } from "../user/user.model";
import { NoteBook } from "../notebook/notebook.model";
import { UserRole } from "../../index";

export class Admin extends User {
  public role: UserRole;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    role: UserRole = UserRole.Admin
  ) {
    super(id, name, email, password, phone, age);
    this.role = role;
  }

  manageNotes(notebook: NoteBook): void {
    console.log(
      `\n[Admin ${this.name}] Managing notebook "${notebook.title}" (ID: ${notebook.id})`
    );
    const notes = notebook.getAllNotes();
    if (notes.length === 0) {
      console.log("  (No notes in this notebook)");
      return;
    }
    notes.forEach((note) => {
      console.log(`  - Note #${note.id}: "${note.title}"`);
      console.log(`    Preview: ${note.preview()}`);
      console.log(`    Author: ${note.author.name}`);
    });
  }

  displayInfo(): void {
    console.log("\n================ Admin Info ===============");
    console.log(`ID:        ${this.id}`);
    console.log(`Name:      ${this.name}`);
    console.log(`Email:     ${this.email}`);
    console.log(`Phone:     ${this.phone}`);
    console.log(`Age:       ${this.age}`);
    console.log(`Role:      ${UserRole[this.role]}`);
    console.log(`Notebooks: ${this.notebooks.length} owned`);
    this.notebooks.forEach((nb) => console.log(`  - "${nb.title}" (ID: ${nb.id})`));
    console.log("===========================================");
  }
}
