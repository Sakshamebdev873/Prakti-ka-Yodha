// src/components/TrashSortingGame.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

// --- (Image Imports and Data Structures are the same) ---
import bgImage from '/src/assets/bg.png';
import binGlass from '/src/assets/bin1.png';
import binHazardous from '/src/assets/bin2.png';
import binMetal from '/src/assets/bin3.png';
import binPaper from '/src/assets/bin4.png';
import binPlastic from '/src/assets/bin5.png';
import binOrganic from '/src/assets/bin6.png';

const trashImages = import.meta.glob('/src/assets/trash/**/*.png', {
  eager: true, query: '?url', import: 'default'
});
type TrashType = 'glass' | 'hazardous' | 'metal' | 'paper' | 'plastic' | 'organic';
interface TrashItem { id: string; type: TrashType; src: string; }

const TRASH_BINS: { type: TrashType, src: string }[] = [
    { type: 'glass', src: binGlass }, { type: 'hazardous', src: binHazardous },
    { type: 'metal', src: binMetal }, { type: 'paper', src: binPaper },
    { type: 'plastic', src: binPlastic }, { type: 'organic', src: binOrganic },
];
const loadTrashes = (): TrashItem[] => {
    const types: TrashType[] = ['glass', 'hazardous', 'metal', 'organic', 'paper', 'plastic'];
    let trashes: TrashItem[] = [];
    for (let i = 1; i <= 4; i++) {
        for (const type of types) {
            const imagePath = `/src/assets/trash/${type}/${i}.png`;
            const imageUrl = trashImages[imagePath] as string;
            if (imageUrl) trashes.push({ id: `${type}-${i}`, type, src: imageUrl });
        }
    }
    return trashes;
};
const allTrashItems = loadTrashes();
const sendGameResultsToBackend = async (score: number, timePlayed: number) => { /* ... */ };


// --- THE REACT COMPONENT ---
const TrashSortingGame = () => {
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);
    const [currentTrash, setCurrentTrash] = useState<TrashItem | null>(null);
    const [gameState, setGameState] = useState<'playing' | 'gameOver'>('playing');
    
    const binRefs = useRef<Map<TrashType, HTMLDivElement | null>>(new Map());
    const trashRef = useRef<HTMLImageElement | null>(null);
    const binControls = useAnimationControls();

    const getRandomTrash = useCallback(() => {
        if (allTrashItems.length === 0) return;
        const randomIndex = Math.floor(Math.random() * allTrashItems.length);
        setCurrentTrash(allTrashItems[randomIndex]);
    }, []);

    // ... (All useEffect hooks are the same as before)
    useEffect(() => {
        if (gameState !== 'playing') return;
        const bounceInterval = setInterval(() => {
            if (currentTrash) {
                const correctBinType = currentTrash.type;
                binControls.start(binType => ({
                    y: binType === correctBinType ? [0, -15, 0] : 0,
                    transition: { duration: 0.5, ease: "easeInOut" }
                }));
            }
        }, 5000);
        return () => clearInterval(bounceInterval);
    }, [currentTrash, gameState, binControls]);
    useEffect(() => { getRandomTrash(); }, [getRandomTrash]);
    useEffect(() => {
        if (gameState !== 'playing' || timer <= 0) {
            if (timer <= 0) setGameState('gameOver');
            return;
        }
        const intervalId = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(intervalId);
    }, [timer, gameState]);


    const handleDrag = () => {
        if (!trashRef.current || !currentTrash || gameState !== 'playing') return;

        const trashRect = trashRef.current.getBoundingClientRect();
        
        let isOverAnyBin = false;
        let isOverCorrectBin = false;

        binRefs.current.forEach((binRef, binType) => {
            if (!binRef) return;
            const binRect = binRef.getBoundingClientRect();
            const isOverlapping = !(
                trashRect.right < binRect.left || trashRect.left > binRect.right ||
                trashRect.bottom < binRect.top || trashRect.top > binRect.bottom
            );

            if (isOverlapping) {
                isOverAnyBin = true;
                if (currentTrash.type === binType) {
                    isOverCorrectBin = true;
                }
            }
        });

        if (isOverCorrectBin) {
            setScore(prev => prev + 1);
            setTimer(10);
            getRandomTrash();
        } else if (isOverAnyBin) {
            setGameState('gameOver');
        }
    };

    const handleReplay = () => {
        setScore(0);
        setTimer(10);
        setGameState('playing');
        getRandomTrash();
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-800">
            <div
                className="relative w-[640px] h-[480px] bg-cover bg-center text-[#6c0056] font-mono select-none"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* ... (UI is the same) ... */}
                <div className="absolute top-4 left-5 text-xl">Score: {score}</div>
                <div className="absolute top-4 right-1/2 translate-x-1/2 text-3xl">{timer}</div>
                <div className="absolute top-[100px] w-full flex justify-center">
                    <AnimatePresence>
                        {currentTrash && gameState === 'playing' && (
                            <motion.img
                                key={currentTrash.id}
                                ref={trashRef}
                                src={currentTrash.src}
                                drag
                                onDrag={handleDrag}
                                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                                // --- THIS IS THE FIX ---
                                // The `dragConstraints` prop has been removed entirely.
                                // Let the user drag anywhere!
                                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                                animate={{ opacity: 1, scale: 1.1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                                // --- UX IMPROVEMENT ---
                                // Make it slightly transparent when dragging to see bins underneath.
                                whileDrag={{ scale: 1.3, zIndex: 50, opacity: 0.8 }}
                                className="p-1 cursor-grab active:cursor-grabbing"
                            />
                        )}
                    </AnimatePresence>
                </div>
                <div className="absolute bottom-5 w-full flex justify-center gap-6">
                    {TRASH_BINS.map((bin) => (
                        <motion.div
                            key={bin.type}
                            ref={(el) => binRefs.current.set(bin.type, el)}
                            custom={bin.type}
                            animate={binControls}
                            className="w-16 h-24 flex items-center justify-center"
                        >
                            <img src={bin.src} alt={`${bin.type} bin`} className="pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
                <AnimatePresence>
                    {gameState === 'gameOver' && (
                         <motion.div 
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                         >
                            <motion.div 
                                className="p-8 text-center bg-gray-800 rounded-lg shadow-xl"
                                initial={{ scale: 0.7, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                            >
                                <h1 className="text-4xl text-white">Game Over!</h1>
                                <h2 className="text-2xl text-white mt-4">Final Score: {score}</h2>
                                <button 
                                    onClick={handleReplay}
                                    className="px-6 py-2 mt-8 text-lg text-white bg-[#6c0056] rounded-md hover:bg-[#8e0072] transition-colors"
                                >
                                    Replay
                                </button>
                            </motion.div>
                         </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrashSortingGame;