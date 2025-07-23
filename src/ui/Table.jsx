export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto w-full max-w-4xl mx-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-4 py-3 whitespace-nowrap"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
