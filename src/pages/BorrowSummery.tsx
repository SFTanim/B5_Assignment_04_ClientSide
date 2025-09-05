import type { IBorrowSummary } from "@/interfaces";
import { useGetBorrowQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  // Fetch aggregated borrow summary data
  const { data, isLoading, isError } = useGetBorrowQuery(undefined);

  if (isLoading) {
    return <p>Loading borrow summary...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Error loading borrow summary.</p>;
  }

  const borrowSummary = data?.data || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Borrow Summary
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
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
              borrowSummary?.map((item: IBorrowSummary) => (
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
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No borrowed books yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
