import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

interface ConfettiProps {
  isExploding?: boolean;
  isRaining?: boolean;
}

const colors = [
  'hsl(42, 85%, 55%)',
  'hsl(350, 70%, 65%)',
  'hsl(350, 50%, 80%)',
  'hsl(35, 25%, 92%)',
  'hsl(350, 60%, 45%)',
];

const Confetti = ({ isExploding = false, isRaining = true }: ConfettiProps) => {
  const [explosionConfetti, setExplosionConfetti] = useState<ConfettiPiece[]>([]);

  // Reduced to 12 pieces for mobile performance
  const rainingConfetti = useMemo<ConfettiPiece[]>(() => {
    if (!isRaining) return [];
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 12; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 8 + 4,
      });
    }
    return pieces;
  }, [isRaining]);

  useEffect(() => {
    if (isExploding) {
      const pieces: ConfettiPiece[] = [];
      // Reduced to 40 pieces for mobile
      for (let i = 0; i < 40; i++) {
        pieces.push({
          id: i,
          x: 50 + (Math.random() - 0.5) * 20,
          delay: Math.random() * 0.2,
          duration: Math.random() * 1.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 720,
          size: Math.random() * 10 + 5,
        });
      }
      setExplosionConfetti(pieces);
    }
  }, [isExploding]);

  return (
    <>
      {isRaining && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {rainingConfetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute will-change-transform"
              style={{
                left: `${piece.x}%`,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: '2px',
              }}
              animate={{
                y: ['-10vh', '110vh'],
                rotate: [0, piece.rotation],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {isExploding && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {explosionConfetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute top-1/2 left-1/2 will-change-transform"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: '2px',
              }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                rotate: piece.rotation,
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Confetti;
