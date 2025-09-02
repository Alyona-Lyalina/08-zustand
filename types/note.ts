export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
export type FilterTag = NoteTag | "All";

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
};
