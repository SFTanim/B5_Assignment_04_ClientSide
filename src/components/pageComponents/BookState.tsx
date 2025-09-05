import type { BookStateProps } from "@/interfaces";

const BookState = ({ books }: BookStateProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
        <h3 className="text-lg font-semibold text-gray-700">Total Books</h3>
        <p className="text-3xl font-bold text-emerald-600">{books.length}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-700">Available Books</h3>
        <p className="text-3xl font-bold text-blue-600">
          {books.filter((book) => book.copies > 0).length}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-semibold text-gray-700">Total Copies</h3>
        <p className="text-3xl font-bold text-purple-600">
          {books.reduce((sum, book) => sum + book.copies, 0)}
        </p>
      </div>
    </div>
  );
};

export default BookState;
