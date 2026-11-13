import { Note } from "../note/note.model";

export class NoteBook {
  public static nextId: number = 1;

  public id: number;
  public title: string;

  private notes: Note[] = [];

  constructor(title: string) {
    this.id = NoteBook.nextId++;
    this.title = title;
  }

  addNote(note: Note): void {
    this.notes.push(note);
    console.log(`  [NoteBook] Added note "${note.title}" (ID: ${note.id}) to "${this.title}"`);
  }

  removeNote(noteId: number): void {
    const index = this.notes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const removed = this.notes.splice(index, 1)[0];
      console.log(
        `  [NoteBook] Removed note "${removed.title}" (ID: ${removed.id}) from "${this.title}"`
      );
    } else {
      console.log(
        `  [NoteBook] Note with ID ${noteId} not found in "${this.title}"`
      );
    }
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }

  getNoteCount(): number {
    return this.notes.length;
  }

  displayNotes(): void {
    console.log(
      `\n--- Notebook: "${this.title}" (ID: ${this.id}) - ${this.notes.length} note(s) ---`
    );
    if (this.notes.length === 0) {
      console.log("(empty)");
    }
    this.notes.forEach((note) => note.displayInfo());
  }
}
