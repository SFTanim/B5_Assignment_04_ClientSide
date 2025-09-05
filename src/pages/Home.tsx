import { useGetBooksQuery, useGetBorrowQuery } from "@/redux/api/baseApi";
import type { IBook, IBorrowSummary } from "@/interfaces";
import { FaBook, FaBookOpen, FaLayerGroup, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  window.scrollTo(0, 0);

  // Get all books
  const {
    data: booksData,
    isLoading: booksLoading,
    isError: booksError,
  } = useGetBooksQuery(undefined);
  const allBooks: IBook[] = booksData?.data || [];

  // Fetch borrow summary
  const { data: borrowData } = useGetBorrowQuery(undefined);
  const borrowSummary: IBorrowSummary[] = borrowData?.data || [];

  const totalBooks = allBooks.length;
  const availableBooks = allBooks.filter((b) => b.copies > 0).length;
  const totalCopies = allBooks.reduce((sum, b) => sum + b.copies, 0);
  const availabilityPercent = totalBooks
    ? (availableBooks / totalBooks) * 100
    : 0;

  // Most borrowed book
  const mostBorrowedBook = borrowSummary.length
    ? borrowSummary.reduce((max, item) =>
        item.totalQuantity > max.totalQuantity ? item : max
      )
    : null;

  if (booksLoading) return <p>Loading books...</p>;
  if (booksError) return <p className="text-red-600">Error loading books.</p>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Library Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your library collection, track books, and handle borrowing
          operations.
        </p>
      </div>

      {/* Stats Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Library Overview
        </h2>
        <p className="text-gray-500 mb-6">
          Quick snapshot of your library statistics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Books */}
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaBook className="text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Total Books</h3>
            <p className="text-3xl font-bold">{totalBooks}</p>
          </div>

          {/* Available Books */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaBookOpen className="text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Available Books</h3>
            <p className="text-3xl font-bold">{availableBooks}</p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${availabilityPercent}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              {availabilityPercent.toFixed(0)}% available
            </p>
          </div>

          {/* Total Copies */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaLayerGroup className="text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Total Copies</h3>
            <p className="text-3xl font-bold">{totalCopies}</p>
          </div>

          {/* Most Borrowed Book */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <FaStar className="text-4xl mb-3" />
            <h3 className="text-lg font-semibold mb-2">Most Borrowed</h3>
            {mostBorrowedBook ? (
              <>
                <p className="text-xl font-bold">
                  {mostBorrowedBook.book.title}
                </p>
                <p className="text-sm mt-1">
                  {mostBorrowedBook.totalQuantity} times
                </p>
              </>
            ) : (
              <p className="text-sm mt-2">No data yet</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Action Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Library Actions
        </h2>
        <p className="text-gray-500 mb-6">
          Perform common library tasks quickly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add New Book */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Add New Book</h3>
            <p className="text-sm mb-4 text-white/80 text-center">
              Quickly add new books to your library collection.
            </p>
            <Link
              to={"/create-book"}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Add Book
            </Link>
          </div>

          {/* View Borrowed Books */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-lg p-6 text-white flex flex-col items-center justify-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">
              <i className="fas fa-book-reader"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">View Borrowed Books</h3>
            <p className="text-sm mb-4 text-white/80 text-center">
              Check which books are currently borrowed and by whom.
            </p>
            <Link
              to={"/borrow-summary"}
              className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              View Borrowed
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-500 mb-6">
          Some of the latest activities in your library.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Book Borrowed
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              "The Great Gatsby" borrowed by John Doe.
            </p>
            <p className="text-xs text-gray-400">Date: 2025-09-05</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Book Returned
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              "1984" returned by Jane Smith.
            </p>
            <p className="text-xs text-gray-400">Date: 2025-09-04</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              New Book Added
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              "Atomic Habits" added to the Fiction section.
            </p>
            <p className="text-xs text-gray-400">Date: 2025-09-03</p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Library Announcements
        </h2>
        <p className="text-gray-500 mb-6">Stay updated with library news.</p>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium">
              Library will be closed on 2025-09-10 for maintenance.
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium">
              New genre "Self-Help" added to the collection.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium">
              Monthly book club meeting scheduled on 2025-09-15.
            </p>
          </div>
        </div>
      </section>

      {/* Tips / Recommendations Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Librarian Tips
        </h2>
        <p className="text-gray-500 mb-6">
          Best practices to manage your library efficiently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Organize by Genre
            </h3>
            <p className="text-sm text-gray-500">
              Ensure all books are categorized properly for easier searching.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Track Borrowing
            </h3>
            <p className="text-sm text-gray-500">
              Keep an eye on most borrowed books to optimize availability.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Update Inventory
            </h3>
            <p className="text-sm text-gray-500">
              Regularly update book copies and remove outdated entries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
