import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

interface GiftBoxProps {
  message: string;
  subMessage?: string;
  size?: 'small' | 'medium' | 'large';
  onOpen?: () => void;
  variant?: 'gold' | 'rose' | 'wine';
}

const GiftBox = ({ 
  message, 
  subMessage, 
  size = 'medium', 
  onOpen,
  variant = 'gold'
}: GiftBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-40 h-40',
    large: 'w-64 h-64',
  };

  const variantClasses = {
    gold: 'from-secondary via-secondary/80 to-secondary/60 border-secondary',
    rose: 'from-rose via-rose/80 to-rose/60 border-rose',
    wine: 'from-primary via-primary/80 to-primary/60 border-primary',
  };

  const handleClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      onOpen?.();
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="box"
            className={`${sizeClasses[size]} cursor-pointer relative`}
            onClick={handleClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
              y: [0, -10, 0],
              rotate: isHovered ? [0, -3, 3, 0] : 0,
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 0.5,
              },
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Box glow */}
            <motion.div
              className="absolute inset-0 rounded-lg blur-xl opacity-50"
              style={{
                background: variant === 'gold' 
                  ? 'hsl(42, 85%, 55%)' 
                  : variant === 'rose' 
                  ? 'hsl(350, 70%, 65%)' 
                  : 'hsl(350, 60%, 45%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Box body */}
            <motion.div
              className={`absolute inset-0 rounded-lg bg-gradient-to-br ${variantClasses[variant]} border-2 shadow-lg`}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {/* Ribbon vertical */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-foreground/20 backdrop-blur-sm" />
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 -translate-y-1/2 h-4 w-full bg-foreground/20 backdrop-blur-sm" />
              
              {/* Bow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="absolute -left-4 -top-1 w-6 h-4 rounded-full bg-foreground/30 rotate-[-30deg]" />
                  <div className="absolute -right-4 -top-1 w-6 h-4 rounded-full bg-foreground/30 rotate-[30deg]" />
                  <div className="w-4 h-4 rounded-full bg-foreground/40" />
                </div>
              </div>

              {/* Sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-6 h-6 text-champagne" />
              </motion.div>
            </motion.div>

            {/* Click hint */}
            <motion.p
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap font-body italic"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Click to open ✧
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`${size === 'large' ? 'min-w-[400px]' : 'min-w-[250px]'} text-center`}
          >
            {/* Sparkle burst */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [1, 0.5, 0] }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 rounded-full bg-secondary/30 blur-xl" />
            </motion.div>

            <motion.div
              className="relative z-10 p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-secondary/30"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              <Gift className="w-8 h-8 text-secondary mx-auto mb-4" />
              <p className="text-xl md:text-2xl font-display text-foreground mb-2">
                {message}
              </p>
              {subMessage && (
                <p className="text-muted-foreground font-body italic">
                  {subMessage}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftBox;
