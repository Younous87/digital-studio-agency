'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RetroMarqueeProps {
    items: string[];
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
    pauseOnHover?: boolean;
}

export default function RetroMarquee({
    items,
    speed = 20,
    direction = 'left',
    className,
    pauseOnHover = true,
}: RetroMarqueeProps) {
    return (
        <div
            className={cn(
                "relative flex overflow-hidden bg-brand-primary py-4 border-y-4 border-black",
                className
            )}
        >
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-background/20 via-transparent to-background/20" />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
            >
                {/* Duplicate items to create seamless loop */}
                {[...items, ...items, ...items, ...items].map((item, index) => (
                    <div
                        key={index}
                        className="mx-8 text-2xl font-black uppercase tracking-wider text-white flex items-center"
                    >
                        <span className="mr-4 text-black">★</span>
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
