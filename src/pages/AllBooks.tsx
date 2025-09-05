import BookState from "@/components/pageComponents/BookState";
import type { IBook } from "@/interfaces";
import {
  useCreateBorrowMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { useState } from "react";
import { toast } from "react-toastify";

const AllBooks = () => {
  window.scrollTo(0, 0);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [borrowMode, setBorrowMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<IBook | null>(null);
  const [borrowData, setBorrowData] = useState({ quantity: 1, dueDate: "" });

  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
  const [createBorrow, { isLoading: borrowLoading }] =
    useCreateBorrowMutation();
  const [deleteBook, { isLoading: deleteLoading }] = useDeleteBookMutation();

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;
  const allBooks: IBook[] = books.data;

  const handleView = (book: IBook) => {
    setSelectedBook(book);
  };

  const handleEdit = (book: IBook) => {
    setSelectedBook(book);
    setEditMode(true);
  };

  const handleBorrow = (book: IBook) => {
    setSelectedBook(book);
    setBorrowMode(true);
    setBorrowData({ quantity: 1, dueDate: "" });
  };

  // Delete with custom modal
  const confirmDelete = (book: IBook) => {
    setDeleteConfirm(book);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteBook(deleteConfirm._id).unwrap();
      toast.success(`"${deleteConfirm.title}" has been deleted successfully.`);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book. Please try again.");
    }
  };

  // ✅ Update
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;

    try {
      await updateBook({
        id: selectedBook._id,
        updates: {
          title: selectedBook.title,
          author: selectedBook.author,
          copies: selectedBook.copies,
          genre: selectedBook.genre,
          isbn: selectedBook.isbn,
          description: selectedBook.description,
        },
      }).unwrap();

      setEditMode(false);
      setSelectedBook(null);
      toast.success("Book updated successfully!");
    } catch (err) {
      console.error("Failed to update book:", err);
      toast.error("Failed to update book. Please try again.");
    }
  };

  const handleBorrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;

    if (borrowData.quantity > selectedBook.copies) {
      toast.warning("Quantity cannot exceed available copies.");
      return;
    }

    try {
      await createBorrow({
        book: selectedBook._id,
        ...borrowData,
      }).unwrap();
      setBorrowMode(false);
      setSelectedBook(null);
      toast.success(`Successfully borrowed "${selectedBook.title}"!`);
    } catch (err) {
      console.error("Failed to borrow book:", err);
      toast.error("Failed to borrow book. Please try again.");
    }
  };

  return (
    <div>
      <div className="min-h-screen ">
        {/* Main Content */}
        <main className="px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Book Management
            </h1>
          </div>

          {/* Book Stats */}
          <BookState books={allBooks}></BookState>

          {/* Book Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Library Books
              </h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allBooks.map((book, idx) => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {idx + 1}
                      </td>
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
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleView(book)}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(book)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        {book.copies > 0 && (
                          <button
                            onClick={() => handleBorrow(book)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Borrow
                          </button>
                        )}
                        <button
                          onClick={() => confirmDelete(book)}
                          disabled={deleteLoading}
                          className={`${
                            deleteLoading
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-900"
                          }`}
                        >
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    "{deleteConfirm.title}"
                  </span>
                  ? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Borrow Modal */}
          {borrowMode && selectedBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Borrow "{selectedBook.title}"
                </h3>
                <form onSubmit={handleBorrowSubmit} className="space-y-3">
                  <input
                    type="number"
                    min={1}
                    max={selectedBook.copies}
                    value={borrowData.quantity}
                    onChange={(e) =>
                      setBorrowData({
                        ...borrowData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Quantity"
                  />
                  <input
                    type="date"
                    value={borrowData.dueDate}
                    onChange={(e) =>
                      setBorrowData({ ...borrowData, dueDate: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setBorrowMode(false);
                        setSelectedBook(null);
                      }}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={borrowLoading}
                      className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                      {borrowLoading ? "Borrowing..." : "Confirm Borrow"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Book Details Modal */}
          {selectedBook && !editMode && !borrowMode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Book Details
                  </h3>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Title:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBook.title}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Author:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBook.author}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Genre:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBook.genre}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">ISBN:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBook.isbn}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Copies:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBook.copies}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editMode && selectedBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Edit Book</h3>
                <form onSubmit={handleUpdateSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={selectedBook.title}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={selectedBook.author}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        author: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Author"
                  />
                  <select
                    value={selectedBook.genre}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        genre: e.target.value as IBook["genre"],
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="FICTION">FICTION</option>
                    <option value="NON_FICTION">NON_FICTION</option>
                    <option value="SCIENCE">SCIENCE</option>
                    <option value="HISTORY">HISTORY</option>
                    <option value="BIOGRAPHY">BIOGRAPHY</option>
                    <option value="FANTASY">FANTASY</option>
                  </select>

                  <input
                    type="text"
                    value={selectedBook.isbn}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        isbn: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="ISBN"
                  />
                  <input
                    type="number"
                    value={selectedBook.copies}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        copies: parseInt(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Copies"
                  />
                  <textarea
                    value={selectedBook.description}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        description: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Description"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setSelectedBook(null);
                      }}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllBooks;
