import { customAlphabet } from "nanoid";
import type { NoteEntry } from "./types.ts";

export const ID_SIZE = 10;

export const nanoid = customAlphabet("1234567890abcdef", ID_SIZE);

export function listNotes(notes: NoteEntry[]) {
	const isOneFavorited = notes.find((note) => note.favorite);

	for (const note of notes) {
		const tags = note.tags?.join(", ");

		console.log("");

		console.log(
			note.favorite ? "★" : isOneFavorited ? " " : "",
			note.id,
			note.content,
		);

		if (tags?.length) {
			console.log(`${" ".repeat(ID_SIZE + 1)}[${tags}]`);
		}
	}
}
