import { useEffect, useState } from "react";
import { useCreateBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { Genre, IBook, ICreateBook } from "@/interfaces";
import BookState from "@/components/pageComponents/BookState";
import { toast } from "react-toastify";

const AddBook = () => {
  window.scrollTo(0, 0);

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
      setShowAddDialog(false);

      toast.success("Book added successfully 📚", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [newAddedBook]);

  useEffect(() => {
    if (addBookError) {
      toast.error("Failed to add book. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [addBookError]);

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

    if (!formData.title || !formData.author || !formData.isbn) {
      toast.warning("Please fill in all required fields!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    const newBook: ICreateBook = {
      ...formData,
      available: formData.copies > 0 ? true : false,
    };

    try {
      await addBook(newBook).unwrap();
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  const closeAddDialog = () => setShowAddDialog(false);

  return (
    <div className="w-full px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
        <Button onClick={handleAddBook}>Add Book</Button>
      </div>

      {/* Book Stats */}
      <BookState books={bookList}></BookState>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Library Books</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookList?.map((book, idx) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {book.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {book.author}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {book.genre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {book.copies}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        book.copies > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.copies > 0 ? "Available" : "Unavailable"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBook;
