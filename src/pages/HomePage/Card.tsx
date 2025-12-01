import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react';
import type { Cat } from '../../App';

// Function to get two number in random
const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export function Card({ id, url, cats, setCats, setLikedCats }: { id: string; url: string; cats: Cat[]; setCats: Dispatch<SetStateAction<Cat[]>>; setLikedCats: Dispatch<SetStateAction<Cat[]>> }) {
    const x = useMotionValue(0);

    // --- YOUR ORIGINAL PHYSICS ---
    // Opacity when the image when swipping (opacity goes to 0.7 when -150 and 150)
    const opacity = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);
    // Rotation of the cats image when swipping
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

    // --- NEW: Stamp Opacity Logic (Fades in based on X movement) ---
    const likeOpacity = useTransform(x, [25, 150], [0, 1]);
    const nopeOpacity = useTransform(x, [-25, -150], [0, 1]);

    // Telling which card is at the infront
    const isFront = id === cats[cats.length - 1].id

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : getRandomNumber(6, -6);
        return rotateRaw.get() + offset;
    })

    // Handle when the image been dragged
    const handleDragEnd = () => {
        const currentCat = cats.find(c => c.id === id);

        // Add to likedCats when the image swipped to right
        if (x.get() > 50 && currentCat) {
            setLikedCats(prev => [...prev, currentCat]);
            setCats(pv => pv.filter(v => v.id !== id));
        }
        // Ignore the image when it is swipped to left
        if (x.get() < -50) {
            setCats(pv => pv.filter(v => v.id !== id));
        }
    }

    return (
        <motion.div
            // MOVED: Classes from img to div so the whole card moves
            className="absolute w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-lg 
            hover:cursor-grab active:cursor-grabbing origin-bottom"
            style={{
                gridRow: 1,
                gridColumn: 1,
                x,
                opacity,
                rotate,
                transition: "0.125s transform",
                boxShadow: isFront
                    ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4)"
                    : "0 6px 12px -2px rgb(0 0 0 / 0.25)",
            }}
            animate={{
                scale: isFront ? 1 : 0.98
            }}
            drag="x"
            dragConstraints={{
                left: 0,
                right: 0
            }}
            onDragEnd={handleDragEnd}
        >
            {/* The Image is now a child, taking up 100% of the wrapper */}
            <img 
                src={url} 
                alt={id} 
                className="w-full h-full object-cover rounded-lg pointer-events-none select-none"
            />

            {/* --- LIKE STAMP (Only shows when dragging right) --- */}
            <motion.div 
                style={{ opacity: likeOpacity }}
                className="absolute top-8 left-6 -rotate-12 border-4 border-green-400 text-green-400 
                font-extrabold text-3xl px-3 py-1 rounded-lg pointer-events-none z-10 bg-black/10"
            >
                LIKE
            </motion.div>

            {/* --- NOPE STAMP (Only shows when dragging left) --- */}
            <motion.div 
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 right-6 rotate-12 border-4 border-red-500 text-red-500 
                font-extrabold text-3xl px-3 py-1 rounded-lg pointer-events-none z-10 bg-black/10"
            >
                NOPE
            </motion.div>

        </motion.div>
    )
}