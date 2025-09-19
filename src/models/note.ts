import { getDatabase, insertData, saveDatabase } from "../database.ts";
import type { NewNote, NoteEntry, NoteMutation } from "../types.ts";
import { nanoid } from "../utils.ts";

export const Note = {
	createOne: async (noteObject: NewNote) => {
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
	findById: async (id: NoteEntry["id"]) => {
		const { notes } = await getDatabase();

		const note = notes.find((note) => note.id === id);

		return note ?? null;
	},
	updateOne: async (id: NoteEntry["id"], updates: NoteMutation) => {
		let { notes } = await getDatabase();

		const notesWithId = notes.filter((note) => note.id.startsWith(id));

		if (notesWithId.length > 1) {
			return notesWithId.map((note) => note.id);
		}

		const existingNote = notesWithId[0];

		if (!existingNote) {
			return null;
		}

		const updatedNote = { ...existingNote, ...updates };
		notes = notes.map((note) =>
			note.id === existingNote.id ? updatedNote : note,
		);

		await saveDatabase({ notes });

		return existingNote.id;
	},
	deleteOne: async (id: NoteEntry["id"]) => {
		let { notes } = await getDatabase();

		const notesWithId = notes.filter((note) => note.id.startsWith(id));

		if (notesWithId.length > 1) {
			return notesWithId.map((note) => note.id);
		}

		const existingNote = notesWithId[0];

		if (!existingNote) {
			return null;
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
