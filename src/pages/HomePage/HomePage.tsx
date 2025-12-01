import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Card } from "./Card";
import axios from "axios";
import type { Cat } from "../../App";
import { Link } from "react-router";

// Simple SVG Icons for buttons
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
);

export function HomePage({ cats, setCats, setLikedCats }: { cats: Cat[]; setCats: Dispatch<SetStateAction<Cat[]>>; setLikedCats: Dispatch<SetStateAction<Cat[]>> }) {

    const fetchCats = async () => {
        const catPromises = Array.from({ length: 10 }, async () => { // Reduced to 10 for better initial load perf
            const response = await axios.get('https://cataas.com/cat?type=medium&fit=inside&position=center&json=true');
            return response.data;
        });
        const fetchedCats = await Promise.all(catPromises);
        setCats(fetchedCats);
    }

    useEffect(() => {
        if (cats.length === 0) fetchCats();
    }, [])

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-slate-900 text-white overflow-hidden">

            {/* --- Background --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-purple-600/30 blur-[120px]" />
                <div className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full bg-rose-600/20 blur-[120px]" />
            </div>

            {/* Floating paw prints */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="paw-print" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>🐾</div>
                <div className="paw-print" style={{ top: '10%', right: '15%', animationDelay: '2s' }}>🐾</div>
                <div className="paw-print" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>🐾</div>
                <div className="paw-print" style={{ bottom: '25%', right: '10%', animationDelay: '6s' }}>🐾</div>
            </div>

            {/* --- Header --- */}
            <div className="relative z-20 w-full px-6 pt-6 flex justify-center items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Paws & Preferences
                    </h1>
                    <p className="text-2xl text-slate-400 font-medium">Find your meow-mate</p>
                </div>
            </div>

            {/* --- Card Stack Container --- */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center my-4">
                <div className="relative w-full h-[65vh] flex items-center justify-center">
                    {cats.length > 0 ? (
                        cats.map((cat) => (
                            <Card
                                key={cat.id}
                                url={cat.url}
                                id={cat.id}
                                cats={cats}
                                setCats={setCats}
                                setLikedCats={setLikedCats}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center animate-pulse gap-4">
                            <div className="text-6xl">😿</div>
                            <p className="text-slate-500 font-semibold">No more cats... refreshing!</p>
                            <button onClick={fetchCats} className="px-6 py-2 bg-white/10 rounded-full text-sm">Reload</button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Bottom Navigation / Action Bar --- */}
            <div className="relative z-20 w-full px-6 pb-8 pt-2">
                <div className="flex items-center justify-between gap-6 max-w-sm mx-auto">

                    {/* --- Bottom Navigation / Action Bar --- */}
                    <div className="relative z-20 w-full px-6 pb-8 pt-2">
                        <div className="flex items-center justify-center max-w-sm mx-auto">
                            {/* Summary Button (Centered) */}
                            <Link to="/summary" className="flex flex-col items-center group">
                                <div className="w-40 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.5)] flex items-center justify-center text-white transform transition active:scale-95 hover:scale-105">
                                    <HeartIcon />
                                    Summary
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Placeholder for settings or reload */}
                    <div className="w-12 h-12 opacity-0"></div>
                </div>
            </div>
        </div>
    );
}