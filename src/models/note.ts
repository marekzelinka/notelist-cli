import { getDatabase, insertData, saveDatabase } from "../database.ts";
import type { NoteEntry, NoteMutation } from "../types.ts";

export const Note = {
	createOne: async (noteObject: NoteMutation) => {
		const note: NoteEntry = {
			id: crypto.randomUUID(),
			...noteObject,
		};
		await insertData(note);

		return note;
	},
	findAll: async (filter?: string) => {
		const database = await getDatabase();
		let notes = database.notes;

		if (filter) {
			notes = notes.filter((note) =>
				note.content.toLowerCase().includes(filter.toLowerCase()),
			);
		}

		return notes;
	},
	deleteOne: async (id: NoteEntry["id"]) => {
		const database = await getDatabase();
		const notes = database.notes;

		const note = notes.find((note) => note.id === id);

		if (!note) {
			return;
		}

		const newNotes = notes.filter((note) => note.id !== id);
		await saveDatabase({ notes: newNotes });

		return id;
	},
	deleteMany: async () => {
		await saveDatabase({ notes: [] });

		return true;
	},
};
