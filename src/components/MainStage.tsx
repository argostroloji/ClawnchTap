
import React, { useState, useCallback } from 'react';

interface MainStageProps {
    onTap: () => boolean;
    tapValue: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    value: number;
}

export const MainStage: React.FC<MainStageProps> = ({ onTap, tapValue }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        // Prevent default behavior to avoid double-firing on some touch devices
        // e.preventDefault(); 

        if (onTap()) {
            // Create particle effect
            const rect = e.currentTarget.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const newParticle: Particle = {
                id: Date.now(),
                x,
                y,
                value: tapValue,
            };

            setParticles((prev) => [...prev, newParticle]);

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 1000);

            // Animation trigger
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 100);
        }
    }, [onTap, tapValue]);

    return (
        <div
            className="relative w-64 h-64 mx-auto mt-10 cursor-pointer select-none touch-manipulation"
            onClick={handleClick}
        // onTouchStart={handleClick} // React handles touch/click unification well usually, but check if needed
        >
            {/* Cyber-Lobster Placeholder (Replace with Image later) */}
            <div
                className={`w-full h-full bg-gradient-to-b from-orange-500 to-red-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,95,31,0.6)] transition-transform duration-100 ${isAnimating ? 'scale-95 brightness-110' : 'scale-100'}`}
            >
                <div className="text-6xl filter drop-shadow-md">
                    🦞
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 border-4 border-electric-blue rounded-full opacity-30 animate-pulse-fast pointer-events-none"></div>
                <div className="absolute -inset-4 border border-dashed border-orange-500 rounded-full opacity-20 spin-slow pointer-events-none"></div>
            </div>

            {/* Floating Particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute text-2xl font-bold text-white pointer-events-none animate-float-up"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    +{particle.value}
                </div>
            ))}
        </div>
    );
};
