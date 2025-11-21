'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsPointer(true);
            } else {
                setIsPointer(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Hide on touch devices
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            {/* Main Cursor Body */}
            <motion.div
                className={`relative flex items-center justify-center ${isPointer ? 'h-12 w-12' : 'h-6 w-6'
                    }`}
                animate={{
                    scale: isClicking ? 0.8 : 1,
                    rotate: isPointer ? 45 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
                {/* Retro Pixel Cursor Shape */}
                <div
                    className={`absolute inset-0 bg-white border-2 border-black transition-all duration-200 ${isPointer ? 'rounded-full opacity-50' : 'rounded-none rotate-0'
                        }`}
                />

                {/* Crosshair for pointer state */}
                {isPointer && (
                    <>
                        <div className="absolute h-full w-[2px] bg-black" />
                        <div className="absolute w-full h-[2px] bg-black" />
                    </>
                )}

                {/* Inner dot */}
                <div className="h-2 w-2 bg-black z-10" />
            </motion.div>
        </motion.div>
    );
}
