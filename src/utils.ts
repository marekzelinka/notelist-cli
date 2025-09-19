import type { NoteEntry } from "./types.ts";

export function listNotes(notes: NoteEntry[]) {
	for (const note of notes) {
		console.log();
		console.log("id:", note.id);
		console.log("content:", note.content);
		console.log("tags:", note.tags.join(", "));
	}
}
