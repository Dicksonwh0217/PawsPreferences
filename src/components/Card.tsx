import { motion, useMotionValue, useTransform } from 'framer-motion'

export function Card({ id, url }: { id: string; url: string }) {
    const x = useMotionValue(0);

    const opacity = useTransform(x, [-150, 0, 150], [0.7, 1, 0.7]);
    const rotate = useTransform(x, [-150, 150], [-18, 18]);

    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 50){
            // Get rid of front card
        }
    }

    return (
        <div>
            <motion.img
                src={url}
                alt={id}
                className="absolute h-96 w-72 rounded-lg object-cover
                hover:cursor-grab active:cursor-grabbing"
                style={{
                    gridRow: 1,
                    gridColumn: 1,
                    x,
                    opacity,
                    rotate
                }}
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                onDragEnd={handleDragEnd}
            />
        </div>
    )
}