export interface NoteMutation {
	content?: string;
	tags?: string[];
	favorite?: boolean;
}

export type NewNote = Omit<NoteMutation, "content"> & {
	content: string;
};

export interface NoteEntry extends NewNote {
	id: string;
}

export interface Database {
	notes: NoteEntry[];
}
