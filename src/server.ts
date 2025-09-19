import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import type { NoteEntry } from "./types.ts";

const HTML_PATH = new URL("../public/template.html", import.meta.url).pathname;

const interpolate = (html: string, data: { notes: string }) => {
	return html.replace(
		/\{\{\s*(\w+)\s*\}\}/g,
		(_match, placeholder: keyof typeof data) => {
			return data[placeholder] || "";
		},
	);
};

const formatNotes = (notes: NoteEntry[]) => {
	return notes
		.map((note) => {
			const tags =
				note.tags?.map((tag) => `<span class="tag">${tag}</span>`).join("") ??
				"";

			return `
        <div class="note">
          <p>${note.content}</p>
          <div class="tags">
            ${tags}
          </div>
        </div>
      `;
		})
		.join("\n");
};

function createServer(notes: NoteEntry[]) {
	return http.createServer(async (_req, res) => {
		const template = await fs.readFile(HTML_PATH, "utf-8");
		const html = interpolate(template, { notes: formatNotes(notes) });

		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(html);
	});
}

export function start(notes: NoteEntry[], port: number) {
	const server = createServer(notes);
	server.listen(port, () => console.log(`Server is listening on port ${port}`));

	open(`http://localhost:${port}`, { wait: true });
}
