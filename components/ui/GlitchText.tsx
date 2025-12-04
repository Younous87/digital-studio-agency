'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export default function GlitchText({
    text,
    className,
    as: Component = 'h1',
}: GlitchTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Component
            className={cn("relative inline-block", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{text}</span>

            {/* Glitch Layer 1 */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-accent-foreground opacity-70"
                animate={isHovered ? {
                    x: [-2, 2, -1, 0],
                    y: [1, -1, 0],
                    opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                    transform: "translate(-2px, -2px)",
                }}
            >
                {text}
            </motion.span>

            {/* Glitch Layer 2 */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-muted-foreground opacity-70"
                animate={isHovered ? {
                    x: [2, -2, 1, 0],
                    y: [-1, 1, 0],
                    opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 0.1,
                }}
                style={{
                    clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)",
                    transform: "translate(2px, 2px)",
                }}
            >
                {text}
            </motion.span>
        </Component>
    );
}
