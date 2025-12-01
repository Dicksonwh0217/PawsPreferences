import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Dispatch, SetStateAction } from 'react';
import type { Cat } from '../../App';
import { HeartIcon } from '../../components/HeartIcon';

// Function to get two number in random
const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

// Component Card to use in HomePage
export function Card({ id, url, tags, cats, setCats, setLikedCats }: { id: string; url: string; tags: string[]; cats: Cat[]; setCats: Dispatch<SetStateAction<Cat[]>>; setLikedCats: Dispatch<SetStateAction<Cat[]>> }) {
    const x = useMotionValue(0);

    // Opacity when the image when swipping (opacity goes to 0.7 when -150 and 150)
    const opacity = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);
    // Rotation of the cats image when swipping
    const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

    // Telling which card is at the infront
    const isFront = id === cats[cats.length - 1].id

    const rotate = useTransform(() => {
        const offset = isFront ? 0 : getRandomNumber(6, -6);
        return rotateRaw.get() + offset;
    })

    // Opacity for swipe right to show like icon (opacity from 0.25 goes to 1 when MotionValue is 75)
    const likeOpacity = useTransform(x, [0, 75], [0.25, 1]);
    // Opacity for swipe left to show dislike icon (opacity from 0.25 goes to 1 when MotionValue is -75)
    const dislikeOpacity = useTransform(x, [-75, 0], [1, 0.25]);

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
            className="absolute w-56 h-68 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-lg 
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
            <img
                src={url}
                alt={id}
                className="w-full h-full object-cover rounded-lg pointer-events-none select-none"
            />

            {/* Stamp for Like/Dislike */}
            {isFront && (
                <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                    {/* Dislike/Skip Icon (Swipe Left) */}
                    <motion.div
                        className="absolute top-4 left-4 text-slate-700"
                        style={{ opacity: dislikeOpacity }}
                    >
                        <HeartIcon />
                    </motion.div>

                    {/* Like Icon (Swipe Right) */}
                    <motion.div
                        className="absolute top-4 right-4 text-red-500"
                        style={{ opacity: likeOpacity }}
                    >
                        <HeartIcon />
                    </motion.div>
                </div>
            )}

            {/* Dark gradient mask at bottom to show tags */}
            <div className="absolute bottom-0 left-0 right-0 h-46 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
                    {/* Show at most 4 tags for each cat images */}
                    {tags.slice(0, 4).map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

        </motion.div>
    )
}