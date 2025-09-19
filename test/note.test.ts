import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/database.ts", () => ({
	getDatabase: vi.fn(),
	saveDatabase: vi.fn(),
	insertData: vi.fn(),
}));

const database =
	await vi.importMock<typeof import("../src/database.ts")>(
		"../src/database.ts",
	);
const { Note } = await import("../src/models/note.ts");

beforeEach(() => {
	database.getDatabase.mockClear();
	database.saveDatabase.mockClear();
	database.insertData.mockClear();
});

describe("note cli", () => {
	it("createOne inserts new note and returns it", async () => {
		const note = "Test note";
		const tags = ["tag1", "tag2"];
		const data = {
			id: crypto.randomUUID(),
			content: note,
			tags,
		};

		database.insertData.mockResolvedValue(data);

		const result = await Note.createOne({ content: note, tags });
		expect(result.content).toEqual(data.content);
		expect(result.tags).toEqual(data.tags);
	});

	it("findAll returns all notes", async () => {
		const db = {
			notes: [
				{ id: "1", content: "note 1" },
				{ id: "2", content: "note 2" },
				{ id: "3", content: "note 3" },
			],
		};

		database.saveDatabase.mockResolvedValue(db);

		const result = await Note.findAll();
		expect(result).toEqual(db.notes);
	});

	it("removeNote does nothing if id is not found", async () => {
		const db = {
			notes: [
				{ id: "1", content: "note 1" },
				{ id: "2", content: "note 2" },
				{ id: "3", content: "note 3" },
			],
		};

		database.saveDatabase.mockResolvedValue(db);

		const idToRemove = "4";
		const result = await Note.deleteOne(idToRemove);
		expect(result).toBeUndefined();
	});
});
