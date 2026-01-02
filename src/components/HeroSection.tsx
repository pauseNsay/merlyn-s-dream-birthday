import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Confetti from './Confetti';

interface HeroSectionProps {
  onGiftOpened?: () => void;
}

const HeroSection = ({ onGiftOpened }: HeroSectionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBoxClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setShowConfetti(true);
      
      // Trigger callback to play Lana Del Rey music
      onGiftOpened?.();
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, hsl(240 30% 5%) 0%, hsl(350 40% 12%) 50%, hsl(240 30% 8%) 100%)',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 z-0">
        <div className="w-full h-full rounded-full bg-gradient-radial from-primary/50 via-transparent to-transparent blur-3xl" />
      </div>

      <Confetti isExploding={showConfetti} isRaining={false} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift"
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleBoxClick}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-6 rounded-3xl blur-2xl z-0"
                style={{ background: 'hsl(42, 85%, 55%)' }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <div className="relative w-44 h-44 md:w-56 md:h-56">
                <div className="absolute bottom-0 w-full h-[70%] bg-gradient-to-br from-secondary via-secondary/90 to-gold rounded-xl border-2 border-champagne/50 shadow-2xl">
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-foreground/20 backdrop-blur-sm" />
                  <div className="absolute top-1/2 -translate-y-1/2 h-6 w-full bg-foreground/20 backdrop-blur-sm" />
                </div>

                <motion.div
                  className="absolute top-0 w-full h-[35%] origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gold via-secondary to-secondary/90 rounded-t-xl border-2 border-champagne/50 shadow-lg">
                    <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-foreground/20 backdrop-blur-sm" />
                    
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="absolute -left-5 -top-1 w-8 h-5 rounded-full bg-foreground/30 rotate-[-30deg]" />
                        <div className="absolute -right-5 -top-1 w-8 h-5 rounded-full bg-foreground/30 rotate-[30deg]" />
                        <div className="w-5 h-5 rounded-full bg-foreground/40 relative z-10" />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-foreground/25 rounded-b-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-champagne"
                    style={{
                      left: `${Math.cos((i / 4) * Math.PI * 2) * 60 + 50}%`,
                      top: `${Math.sin((i / 4) * Math.PI * 2) * 60 + 50}%`,
                    }}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="mt-6 text-base md:text-lg font-body italic text-muted-foreground"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Click the gift to unwrap your surprise ✧
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="relative z-10 text-center px-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
              style={{ background: 'hsl(42, 85%, 55%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(42 85% 65%) 0%, hsl(35 75% 55%) 50%, hsl(42 85% 75%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Happy Birthday, Merlyn
              </motion.h1>

              <motion.p
                className="text-2xl md:text-3xl font-body text-foreground/90 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                🎉✨
              </motion.p>

              <motion.div
                className="max-w-xl mx-auto p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-md border border-secondary/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-lg md:text-xl font-body text-foreground leading-relaxed">
                  You're officially getting older… but somehow more iconic every year.
                </p>
                <p className="mt-3 text-base font-body italic text-muted-foreground">
                  Like fine wine, or that one song you keep replaying — you just get better with time.
                </p>
              </motion.div>

              <motion.p
                className="mt-6 text-base text-muted-foreground font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Scroll down for more surprises ↓
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
