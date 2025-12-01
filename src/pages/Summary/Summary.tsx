import { Link } from "react-router";
import type { Cat } from "../../App";

export function Summary({ likedCats }: { likedCats: Cat[] }) {

    if (!likedCats.length) {
        return (
            <div className="p-4 text-center">
                <h1 className="text-xl font-bold">No liked cats yet 😿</h1>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Link to="/" className="w-42 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.5)] flex items-center justify-center text-white transform transition active:scale-95 hover:scale-105">
                ← Back to swiping
            </Link>
            <h1 className="text-2xl font-bold mb-4">Your Liked Cats ❤️</h1>

            <div className="grid grid-cols-2 gap-4">
                {likedCats.map(cat => (
                    <img
                        key={cat.id}
                        src={cat.url}
                        className="w-full h-40 object-cover rounded-lg shadow"
                    />
                ))}
            </div>
        </div>
    );
}
