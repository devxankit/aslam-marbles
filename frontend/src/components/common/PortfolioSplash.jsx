import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PortfolioSplash = ({ onComplete }) => {
    const splashRef = useRef(null);
    const portRef = useRef(null);
    const folioRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the entire splash screen
                gsap.to(splashRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    delay: 1,
                    onComplete: onComplete
                });
            }
        });

        // Initial states
        gsap.set(portRef.current, { x: '-100vw', opacity: 0, scale: 1.2 });
        gsap.set(folioRef.current, { x: '100vw', opacity: 0, scale: 1.2 });
        gsap.set(containerRef.current, { opacity: 1 });

        // Animation sequence
        tl.to([portRef.current, folioRef.current], {
            x: 0,
            opacity: 1,
            duration: 1.8,
            ease: "expo.inOut",
        })
            .to([portRef.current, folioRef.current], {
                scale: 1,
                duration: 1.2,
                ease: "power4.out"
            }, "-=0.8")
            .to(portRef.current, {
                color: '#ffffff',
                duration: 0.5
            }, "-=0.5")
            .to(folioRef.current, {
                color: '#8B7355',
                duration: 0.5
            }, "-=0.5")
            .to(containerRef.current, {
                letterSpacing: '0.2em',
                duration: 1.5,
                ease: "power2.inOut"
            }, "-=0.5")
            .to(splashRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Just to have it
                duration: 0.1
            });

    }, [onComplete]);

    return (
        <div
            ref={splashRef}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
            style={{ pointerEvents: 'none' }}
        >
            <div
                ref={containerRef}
                className="relative flex items-center justify-center font-serif text-5xl md:text-9xl font-black italic tracking-tighter"
            >
                <div className="flex overflow-hidden">
                    <span
                        ref={portRef}
                        className="text-white inline-block pr-1 md:pr-4"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))' }}
                    >
                        PORT
                    </span>
                    <span
                        ref={folioRef}
                        className="text-[#8B7355] inline-block"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(139, 115, 85, 0.3))' }}
                    >
                        FOLIO
                    </span>
                </div>
            </div>

            {/* Elegant horizontal line reveal */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B7355] to-transparent opacity-30 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>
        </div>
    );
};

export default PortfolioSplash;
