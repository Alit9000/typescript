import { Person } from "./modules/user/user.model";
import { User } from "./modules/user/user.model";
import { Admin } from "./modules/admin/admin.model";
import { Note } from "./modules/note/note.model";
import { NoteBook } from "./modules/notebook/notebook.model";
import { Storage } from "./utils/storage";

export interface IAuthor {
  getAuthorInfo(): string;
}

export interface IManageable {
  manageNotes(notebook: NoteBook): void;
}

export enum UserRole {
  Admin = "Admin",
  Regular = "Regular",
}

export type ContactInfo = [string, string];

async function main(): Promise<void> {
  console.log("==============================================");
  console.log("  Simple Notes Management System (TypeScript)");
  console.log("==============================================");

  console.log("\n[1] Creating regular users...");
  const user1 = new User(1, "abdallah", "alice@example.com", "pass123", "+1-234-5678", 25);
  const user2 = new User(2, "tamer", "bob@example.com", "secure456", "+1-987-6543", 30);

  console.log("[2] Creating an admin...");
  const admin = new Admin(
    3,
    "ali",
    "charlie@example.com",
    "admin000",
    "+1-112-2334",
    40,
    UserRole.Admin
  );

  console.log("[3] Creating multiple notebooks...");
  const notebook1 = new NoteBook("Personal");
  const notebook2 = new NoteBook("Work");
  const notebook3 = new NoteBook("Ideas");

  user1.addNotebook(notebook1);
  user1.addNotebook(notebook2);
  admin.addNotebook(notebook1);
  admin.addNotebook(notebook3);

  console.log("[4] Creating multiple notes...");
  const note1 = new Note(
    "Project Meeting",
    "Discuss project timeline, deliverables, and milestones for Q1 with the team.",
    user1
  );
  const note2 = new Note(
    "Shopping List",
    "Buy milk, eggs, bread, butter, fruits, and vegetables from the store.",
    user1
  );
  const note3 = new Note(
    "Startup Idea",
    "A mobile app that uses AI agents to manage personal notes and tasks.",
    user2
  );
  const note4 = new Note(
    "Meeting Notes",
    "Quarterly review: revenue up 12%, new customers acquired, next steps planned.",
    admin
  );

  console.log("[5] Adding notes to notebooks...");
  notebook1.addNote(note1);
  notebook1.addNote(note2);
  notebook2.addNote(note3);
  notebook3.addNote(note4);

  console.log("[6] Removing a note from a notebook...");
  notebook1.removeNote(note2.id);

  console.log("\n[7] Displaying user information...");
  user1.displayInfo();
  user2.displayInfo();
  admin.displayInfo();

  console.log("\n[8] Testing age validation (setter/getter)...");
  try {
    user1.age = 150;
  } catch (error) {
    console.log(`  Caught validation error: ${(error as Error).message}`);
  }
  user1.age = 31;
  console.log(`  abdallah's age after valid update: ${user1.age}`);

  console.log("\n[9] Encapsulation demo (private password accessed via getter)...");
  console.log(`  abdallah's password (via getter): ${user1.getPassword()}`);

  console.log("\n[10] Displaying note previews...");
  console.log(`  Note #${note1.id} preview: ${note1.preview()}`);
  console.log(`  Note #${note2.id} preview: ${note2.preview()}`);
  console.log(`  Note #${note3.id} preview: ${note3.preview()}`);
  console.log(`  Note #${note4.id} preview: ${note4.preview()}`);

  console.log("\n[11] Demonstrating Note -> Author association...");
  console.log(`  Note "${note3.title}" is written by: ${note3.author.name}`);

  console.log("\n[12] Demonstrating User-Notebook relationship (Aggregation)...");
  console.log(`  ${user1.name} owns ${user1.notebooks.length} notebook(s):`);
  user1.notebooks.forEach((nb) => {
    console.log(`    - "${nb.title}" containing ${nb.getNoteCount()} note(s)`);
  });

  console.log("\n[13] Polymorphism demo (Person[] calling overridden displayInfo())...");
  const people: Person[] = [user1, admin];
  people.forEach((person) => person.displayInfo());

  console.log("\n[14] Static nextId counters...");
  console.log(`  Note.nextId:     ${Note.nextId}`);
  console.log(`  NoteBook.nextId: ${NoteBook.nextId}`);

  console.log("\n[15] Type alias / tuple (ContactInfo: [string, string])...");
  const contact: ContactInfo = [user1.phone, user1.email];
  console.log(`  Contact: phone = ${contact[0]}, email = ${contact[1]}`);

  console.log("\n[16] Interfaces demo (IAuthor, IManageable)...");
  const authors: IAuthor[] = [user1, note1];
  authors.forEach((author) => console.log(`  - ${author.getAuthorInfo()}`));
  admin.manageNotes(notebook2);

  console.log("\n[17] Testing generic Storage<T> class...");

  const userStorage = new Storage<User>();
  await userStorage.addItem(user1);
  await userStorage.addItem(user2);
  await userStorage.addItem(admin);
  const storedUsers = await userStorage.getAllItems();
  console.log(`  UserStorage contains ${storedUsers.length} item(s):`);
  storedUsers.forEach((u) => console.log(`    - ${u.name} (${u.constructor.name})`));

  const numberStorage = new Storage<number>();
  await numberStorage.addItem(100);
  await numberStorage.addItem(200);
  await numberStorage.addItem(300);
  await numberStorage.removeItem(200);
  const storedNumbers = await numberStorage.getAllItems();
  console.log(`  NumberStorage contains: ${storedNumbers.join(", ")}`);

  const stringStorage = new Storage<string>();
  await stringStorage.addItem("TypeScript");
  await stringStorage.addItem("OOP");
  await stringStorage.addItem("Generics");
  const storedStrings = await stringStorage.getAllItems();
  console.log(`  StringStorage contains: ${storedStrings.join(", ")}`);

  console.log("\n==============================================");
  console.log("  Application finished successfully!");
  console.log("==============================================");
}

main().catch((error) => {
  console.error("Unhandled error:", error);
});
