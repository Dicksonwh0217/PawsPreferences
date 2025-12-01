import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Card } from "./Card";
import axios from "axios";
import type { Cat } from "../../App";
import { Link } from "react-router";
import { HeartIcon } from "../../components/HeartIcon";
import { LoadingAnimation } from "../../components/LoadingAnimation";

export function HomePage({ cats, setCats, setLikedCats }: { cats: Cat[]; setCats: Dispatch<SetStateAction<Cat[]>>; setLikedCats: Dispatch<SetStateAction<Cat[]>> }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Fetch Cats data function from the cataas api
    const fetchCats = async () => {
        setIsLoading(true);
        const catPromises = Array.from({ length: 10 }, async () => {
            const response = await axios.get('https://cataas.com/cat?type=medium&fit=inside&position=center&json=true');
            return response.data;
        });
        const fetchedCats = await Promise.all(catPromises);
        setCats(fetchedCats);
    }

    // Call the fetchCats function when cats array length is 0
    useEffect(() => {
        if (cats.length === 0) {
            fetchCats();
        } else {
            // If cats are already present, set isLoading to false
            setIsLoading(false);
        }
    }, [cats])

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

            <div className="relative z-20 w-full px-6 pt-6 flex flex-col items-center mb-4">

                {/* Web Title */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Paws & Preferences
                    </h1>
                    <p className="text-xl text-slate-400 font-medium">Find your meow-mate</p>
                </div>

            </div>

            <div className="w-full max-w-sm mx-auto flex items-center gap-4 justify-start">
                {/* Used 'flex-shrink-0' to prevent it from squishing */}
                <div className="w-16 h-16 aspect-square rounded-full border-2 border-white overflow-hidden shadow-xl flex-shrink-0 ml-6">
                    <img
                        src="public\catProfile.jpg"
                        alt="User Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Swipe Instruction Message Box (Now flex-grow to use available space) */}
                <div className="flex-grow p-2 rounded-xl bg-white/15 backdrop-blur-sm text-sm font-semibold text-slate-100 shadow-lg text-left mr-16">
                    <p>
                        Swipe left for skip 👈
                        <br />
                        Swipe right for like 👉
                    </p>
                </div>
            </div>

            {/* --- Card Container --- */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center my-4 h-[65vh]">
                <div className="relative w-full h-[65vh] flex items-center justify-center">
                    {cats.length > 0 ? (
                        cats.map((cat) => (
                            <Card
                                key={cat.id}
                                url={cat.url}
                                id={cat.id}
                                tags={cat.tags}
                                cats={cats}
                                setCats={setCats}
                                setLikedCats={setLikedCats}
                            />
                        ))
                    ) : isLoading && <LoadingAnimation />}
                </div>
            </div>

            {/* Summary Container */}
            <div className="relative z-20 w-full px-6 pb-10 pt-2 flex justify-center items-center max-w-sm mx-auto ">
                {/* Summary Button */}
                <Link to="/summary">
                    <div className="w-40 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.5)] flex items-center justify-center text-white transform transition active:scale-95 hover:scale-105">
                        <HeartIcon />
                        Summary
                    </div>
                </Link>
            </div>
        </div>
    );
}