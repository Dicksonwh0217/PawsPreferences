import { Link } from "react-router";
import type { Cat } from "../../App";

export function Summary({ likedCats }: { likedCats: Cat[] }) {

    // Show text when cats is not yet been swipe
    if (!likedCats.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
                <div className="text-6xl mb-4">😿</div>
                <h1 className="text-2xl font-bold">No liked cats yet!</h1>
                <Link to="/" className="mt-6 px-6 py-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg text-white transform transition active:scale-95 hover:scale-105">
                    Start Swiping
                </Link>
            </div>
        );
    }

    
    return (
        <div className="p-4 bg-slate-900 min-h-screen text-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-0">
                        Your Liked Cats ❤️
                    </h1>
                    {/* Back to HomePage */}
                    <Link
                        to="/"
                        className="h-12 w-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.5)] flex items-center justify-center text-white font-semibold transform transition active:scale-95 hover:scale-105"
                    >
                        ← Back to swiping
                    </Link>
                </div>


                {/* --- Responsive Grid of Cats --- */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {likedCats.map(cat => (
                        <div
                            key={cat.id}
                            className="relative aspect-square overflow-hidden rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={cat.url}
                                alt={`Cat ID: ${cat.id}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Dark gradient mask at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                            {/* Tags */}
                            {cat.tags && cat.tags.length > 0 && (
                                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
                                    {cat.tags.slice(0, 1).map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-small"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}