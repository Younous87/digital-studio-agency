'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
    duration?: number;
}

export default function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = 'up',
    distance = 50,
    duration = 0.5,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up': return { y: distance };
            case 'down': return { y: -distance };
            case 'left': return { x: distance };
            case 'right': return { x: -distance };
            default: return { y: distance };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...getInitialPosition()
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0
            } : {}}
            transition={{
                duration: duration,
                delay: delay,
                type: "spring",
                damping: 20,
                stiffness: 100
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
