import fs from "node:fs/promises";
import type { Database, NoteEntry } from "./types.ts";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export async function getDatabase(): Promise<Database> {
	const rawDatabase = await fs.readFile(DB_PATH, "utf-8");

	return JSON.parse(rawDatabase);
}

export async function saveDatabase(database: Database): Promise<Database> {
	const rawDatabase = JSON.stringify(database, null, 2);

	await fs.writeFile(DB_PATH, rawDatabase);

	return database;
}

export async function insertData(note: NoteEntry): Promise<NoteEntry> {
	const database = await getDatabase();
	database.notes.push(note);

	await saveDatabase(database);

	return note;
}
