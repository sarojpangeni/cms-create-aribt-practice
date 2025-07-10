
const DynamicTable = ({
    headings,
    data,
    onEdit,
    onDelete,
    onView,
    pagination,
}) => {
    const Headings = ["SN", ...headings];

    return (
        <div className="overflow-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-max">
                    {data.length === 0 ? (
                        <div className="text-center text-gray-500 py-6">No data found</div>
                    ) : (
                        <>
                            <table className="min-w-full table-auto text-sm text-left">
                                <thead className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50">
                                    <tr>
                                        {Headings.map((heading, index) => (
                                            <th
                                                key={index}
                                                className="px-5 py-3 font-medium text-gray-500 dark:text-gray-400"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {data.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition">
                                            {Headings.map((heading, colIdx) => (
                                                <td
                                                    key={colIdx}
                                                    className="px-5 py-4 sm:px-6 text-gray-800 dark:text-white"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {heading === "SN" ? (
                                                            pagination ? (
                                                                pagination.pageNumber * pagination.pageSize + idx + 1
                                                            ) : (
                                                                idx + 1
                                                            )
                                                        ) : heading === "Action" ? (
                                                            <div className="flex gap-3">
                                                                {onView && (
                                                                    <button
                                                                        className="text-gray-600 hover:text-gray-800"
                                                                        onClick={() => onView(row)}
                                                                        title="View"
                                                                    >
                                                                        👁️
                                                                    </button>
                                                                )}
                                                                <button
                                                                    className="text-blue-600 hover:text-blue-800"
                                                                    onClick={() => onEdit?.(row)}
                                                                    title="Edit"
                                                                >
                                                                    ✏️
                                                                </button>
                                                                <button
                                                                    className="text-red-600 hover:text-red-800"
                                                                    onClick={() => onDelete?.(row)}
                                                                    title="Delete"
                                                                >
                                                                    🗑️
                                                                </button>
                                                            </div>
                                                        ) : heading.toLowerCase().includes("image") ||
                                                            heading.toLowerCase().includes("icon") ? (
                                                            <img
                                                                alt="img"
                                                                src={!row[heading] || row[heading] === "null" ? row[heading] : undefined}
                                                                
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                        ) : heading === "Description" || heading === "Items" ? (
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: row[heading] }}
                                                                className="whitespace-pre-wrap"
                                                            />
                                                        ) : row[heading] !== undefined ? (
                                                            row[heading]
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </div>
                                                </td>
                                            ))}

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicTable;
