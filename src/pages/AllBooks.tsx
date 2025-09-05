import { useEffect, useState } from "react";
import { useCreateBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { Genre, IBook, ICreateBook } from "@/interfaces";


const AllBooks = () => {
  // Fetch books
  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useGetBooksQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Mutation for adding a book
  const [
    addBook,
    { data: newAddedBook, isLoading: addingBook, isError: addBookError },
  ] = useCreateBookMutation();

  const [bookList, setBookList] = useState<IBook[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [formData, setFormData] = useState<Omit<ICreateBook, "available">>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (booksData?.data) {
      setBookList(booksData.data);
    }
  }, [booksData]);

  useEffect(() => {
    if (newAddedBook) {
      setBookList((prevBooks) => [...prevBooks, newAddedBook]);
      setShowAddDialog(false); // close dialog after adding
    }
  }, [newAddedBook]);

  if (booksLoading) return <p>Loading books...</p>;
  if (booksError) return <p>Error loading books.</p>;

  const handleAddBook = () => {
    setFormData({
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
    });
    setShowAddDialog(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: ICreateBook = {
      ...formData,
      available: formData.copies > 0 ? true : false,
    };

    try {
      await addBook(newBook);
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  const closeAddDialog = () => setShowAddDialog(false);

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Book Management</h1>
        <Button onClick={handleAddBook}>Add Book</Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Books</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-emerald-600">
            {bookList.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Available</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-blue-600">
            {bookList.filter((b) => b.available).length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Copies</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-purple-600">
            {bookList.reduce((sum, b) => sum + b.copies, 0)}
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Serial</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-left">Copies</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookList?.map((book, idx) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2">{book.copies}</td>
                <td className="px-4 py-2">
                  {book.available ? (
                    <span className="text-green-600 font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Unavailable
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={showAddDialog} onOpenChange={closeAddDialog}>
        <DialogContent className="w-full max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new book to the library.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-3">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input
              placeholder="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
            <select
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value as Genre })
              }
              className="w-full border rounded-md p-2"
            >
              <option value="FICTION">FICTION</option>
              <option value="NON_FICTION">NON_FICTION</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="HISTORY">HISTORY</option>
              <option value="BIOGRAPHY">BIOGRAPHY</option>
              <option value="FANTASY">FANTASY</option>
            </select>
            <Input
              placeholder="ISBN"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Copies"
              value={formData.copies}
              onChange={(e) =>
                setFormData({ ...formData, copies: +e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={addingBook}>
                {addingBook ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={closeAddDialog}
              >
                Cancel
              </Button>
            </div>
            {addBookError && (
              <p className="text-red-500 text-sm">
                Failed to add book. Please try again.
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllBooks;
