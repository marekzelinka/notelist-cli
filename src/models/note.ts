import { getDatabase, insertData, saveDatabase } from "../database.ts";
import type { NoteEntry, NoteMutation } from "../types.ts";
import { nanoid } from "../utils.ts";

export const Note = {
	createOne: async (noteObject: NoteMutation) => {
		const note: NoteEntry = {
			id: nanoid(),
			...noteObject,
		};
		await insertData(note);

		return note;
	},
	findAll: async (filter?: string) => {
		let { notes } = await getDatabase();

		if (filter) {
			notes = notes.filter((note) =>
				note.content.toLowerCase().includes(filter.toLowerCase()),
			);
		}

		return notes;
	},
	deleteOne: async (id: NoteEntry["id"]) => {
		let { notes } = await getDatabase();

		const notesWithId = notes.filter((note) => note.id.startsWith(id));

		if (notesWithId.length > 1) {
			return notesWithId.map((note) => note.id);
		}

		const existingNote = notesWithId[0];

		if (!existingNote) {
			return;
		}

		notes = notes.filter((note) => note.id !== existingNote.id);

		await saveDatabase({ notes });

		return existingNote.id;
	},
	deleteMany: async () => {
		await saveDatabase({ notes: [] });

		return true;
	},
};
