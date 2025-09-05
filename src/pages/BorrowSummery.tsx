import type { IBorrowSummary } from "@/interfaces";
import { useGetBorrowQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  window.scrollTo(0, 0);
  const { data, isLoading, isError } = useGetBorrowQuery(undefined);

  if (isLoading) return <p>Loading borrow summary...</p>;
  if (isError)
    return <p className="text-red-600">Error loading borrow summary.</p>;

  const borrowSummary: IBorrowSummary[] = data?.data || [];

  // Compute stats for cards
  const totalBorrowedBooks: number = borrowSummary.length;

  const totalQuantityBorrowed: number = borrowSummary.reduce(
    (sum: number, item: IBorrowSummary) => sum + item.totalQuantity,
    0
  );

  const mostBorrowed: number = borrowSummary.length
    ? borrowSummary.reduce(
        (max: number, item: IBorrowSummary) =>
          item.totalQuantity > max ? item.totalQuantity : max,
        0
      )
    : 0;

  const minBorrowed: number = borrowSummary.length
    ? borrowSummary.reduce(
        (min: number, item: IBorrowSummary) =>
          item.totalQuantity < min ? item.totalQuantity : min,
        borrowSummary[0].totalQuantity
      )
    : 0;

  return (
    <div className="w-full px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Browse Borrow Summary
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
          <h3 className="text-lg font-semibold text-gray-700">
            Distinct Borrowed Books
          </h3>
          <p className="text-3xl font-bold text-emerald-600">
            {totalBorrowedBooks}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Quantity Borrowed
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {totalQuantityBorrowed}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700">
            Most Borrowed Quantity
          </h3>
          <p className="text-3xl font-bold text-purple-600">{mostBorrowed}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-700">
            Least Borrowed Quantity
          </h3>
          <p className="text-3xl font-bold text-red-600">{minBorrowed}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Borrow Details
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Quantity Borrowed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {borrowSummary.length > 0 ? (
                borrowSummary.map((item: IBorrowSummary) => (
                  <tr key={item.book.isbn} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.book.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.book.isbn}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {item.totalQuantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No borrowed books yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
