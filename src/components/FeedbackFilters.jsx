import { Star, SortAsc, SortDesc } from "lucide-react"

export default function FeedbackFilters({ filterRate, setFilterRate, sortOrder, setSortOrder }) {
    const handleRateClick = (rate) => {
        // Toggle: clicking same star again clears it
        if (filterRate === rate) {
            setFilterRate(0)
        } else {
            setFilterRate(rate)
        }
    }

    return (
        <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-md rounded-xl p-4 flex flex-row sm:flex-row items-center justify-between gap-4 mb-4">

            {/* Rating Stars Filter */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rate) => (
                    <button
                        key={rate}
                        onClick={() => handleRateClick(rate)}
                        className={`p-1 rounded-full hover:scale-110 transition ${filterRate >= rate ? "text-yellow-500" : "text-gray-400"
                            }`}
                        title={`${rate} Star${rate > 1 ? "s" : ""}`}
                    >
                        <Star
                            className={`w-5 h-5 ${filterRate >= rate ? "fill-yellow-400" : ""}`}
                        />
                    </button>
                ))}
                {filterRate !== 0 && (
                    <button
                        onClick={() => setFilterRate(0)}
                        className="text-sm text-blue-600 underline ml-3"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Sort Button */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-white/40 rounded-lg border border-gray-300 hover:bg-white/60 transition"
                >
                    {sortOrder === "desc" ? (
                        <SortDesc className="w-4 h-4" />
                    ) : (
                        <SortAsc className="w-4 h-4" />
                    )}
                </button>
            </div>

        </div>
    )
}
