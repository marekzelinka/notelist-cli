import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Note } from "./models/note.ts";
import { listNotes } from "./utils.ts";

yargs(hideBin(process.argv))
	.command(
		["new <note>", "+ <note>", "plus <note>"],
		"create a new note",
		(yargs) =>
			yargs
				.positional("note", {
					describe: "The content of the note you want to create",
					type: "string",
					demandOption: true,
				})
				.option("tags", {
					alias: "t",
					type: "string",
					description: "tags to add to the note",
				}),
		async (argv) => {
			const tags = argv.tags?.split(",") ?? [];
			const note = await Note.createOne({ content: argv.note, tags });

			console.log("Note added", note.id);
		},
	)
	.command(
		["all", "ls"],
		"get all notes",
		() => {},
		async (_argv) => {
			const notes = await Note.findAll();
			listNotes(notes);
		},
	)
	.command(
		["find <filter>", "f <filter>"],
		"get matching notes",
		(yargs) =>
			yargs.positional("filter", {
				describe:
					"The search term to filter notes by, will be applied to note.content",
				type: "string",
			}),
		async (argv) => {
			const notes = await Note.findAll(argv.filter);
			listNotes(notes);
		},
	)
	.command(
		["remove <id>", "rm <id>", "- <id>"],
		"remove a note by id",
		(yargs) =>
			yargs.positional("id", {
				type: "string",
				description: "The id of the note you want to remove",
				demandOption: true,
			}),
		async (argv) => {
			const id = await Note.deleteOne(argv.id);

			if (!id) {
				console.error("Note not found");
				return;
			}

			console.log("Note removed", id);
		},
	)
	.command(
		["clean", "reset"],
		"remove all notes",
		() => {},
		async (_argv) => {
			await Note.deleteMany();

			console.log("All notes removed");
		},
	)
	.command(
		"web [port]",
		"launch website to see notes",
		(yargs) =>
			yargs.positional("port", {
				describe: "port to bind on",
				default: 5000,
				type: "number",
			}),
		async (_argv) => {},
	)
	.demandCommand(1)
	.parse();
