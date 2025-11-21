'use client';

import { Button, IButtonProps } from '@/components/retroui/Button';
import confetti from 'canvas-confetti';
import { useRef } from 'react';

interface ConfettiButtonProps extends IButtonProps {
    particleCount?: number;
    spread?: number;
}

export default function ConfettiButton({
    children,
    onClick,
    particleCount = 100,
    spread = 70,
    ...props
}: ConfettiButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = buttonRef.current?.getBoundingClientRect();

        if (rect) {
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                origin: { x, y },
                particleCount,
                spread,
                colors: ['#FF6B35', '#FFD23F', '#00D9FF', '#FF3CAC', '#00FF87'],
                shapes: ['square', 'circle'],
                disableForReducedMotion: true,
            });
        }

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Button
            ref={buttonRef}
            onClick={handleConfetti}
            {...props}
        >
            {children}
        </Button>
    );
}
