export interface NoteMutation {
	content: string;
	tags: string[];
}

export interface NoteEntry extends NoteMutation {
	id: string;
}

export interface Database {
	notes: NoteEntry[];
}
