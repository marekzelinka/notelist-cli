import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Note } from "./models/note.ts";

yargs(hideBin(process.argv))
	.command(
		"new <note>",
		"create a new note",
		(yargs) => {
			return yargs
				.positional("note", {
					describe: "The content of the note you want to create",
					type: "string",
					demandOption: true,
				})
				.option("tags", {
					alias: "t",
					type: "string",
					description: "tags to add to the note",
				});
		},
		async (argv) => {
			const tags = argv.tags?.split(",") ?? [];
			const note = await Note.createOne({ content: argv.note, tags });
			console.log("Note added", note.id);
		},
	)
	.command(
		"all",
		"get all notes",
		() => {},
		async (argv) => {},
	)
	.command(
		"find <filter>",
		"get matching notes",
		(yargs) => {
			return yargs.positional("filter", {
				describe:
					"The search term to filter notes by, will be applied to note.content",
				type: "string",
			});
		},
		async (argv) => {},
	)
	.command(
		"remove <id>",
		"remove a note by id",
		(yargs) => {
			return yargs.positional("id", {
				type: "number",
				description: "The id of the note you want to remove",
			});
		},
		async (argv) => {},
	)
	.command(
		"web [port]",
		"launch website to see notes",
		(yargs) => {
			return yargs.positional("port", {
				describe: "port to bind on",
				default: 5000,
				type: "number",
			});
		},
		async (argv) => {},
	)
	.command(
		"clean",
		"remove all notes",
		() => {},
		async (argv) => {},
	)
	.demandCommand(1)
	.parse();
