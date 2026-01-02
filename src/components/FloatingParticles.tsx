import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'heart' | 'sparkle';
}

const FloatingParticles = () => {
  // Reduced to 15 particles for mobile performance
  const particles = useMemo<Particle[]>(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 3,
        type: ['star', 'heart', 'sparkle'][Math.floor(Math.random() * 3)] as 'star' | 'heart' | 'sparkle',
      });
    }
    return newParticles;
  }, []);

  const renderParticle = (type: string) => {
    switch (type) {
      case 'star':
        return '✦';
      case 'heart':
        return '♡';
      case 'sparkle':
        return '✧';
      default:
        return '✦';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-secondary/30 will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderParticle(particle.type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
