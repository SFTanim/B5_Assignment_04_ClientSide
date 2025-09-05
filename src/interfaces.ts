export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface IBorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}
