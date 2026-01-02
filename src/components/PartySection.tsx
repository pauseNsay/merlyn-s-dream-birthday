import { motion } from 'framer-motion';
import GiftBox from './GiftBox';
import { useState, useMemo } from 'react';
import Confetti from './Confetti';

const messages = [
  {
    message: "Another year older, another year of questionable decisions 💅",
    subMessage: "But honestly? You make them all look glamorous.",
    variant: 'gold' as const,
  },
  {
    message: "You're not aging, you're leveling up ✨",
    subMessage: "And clearly, you've unlocked some kind of eternal glow cheat code.",
    variant: 'rose' as const,
  },
  {
    message: "Birthdays are just annual reminders that you're a legend!!!",
    subMessage: "This is your reminder.",
    variant: 'wine' as const,
  },
  {
    message: "May your birth day be noice!! ",
    subMessage: "And may your coffee always be the perfect temperature.",
    variant: 'gold' as const,
  },
];

const PartySection = () => {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBoxOpen = (index: number) => {
    if (!openedBoxes.includes(index)) {
      setOpenedBoxes([...openedBoxes, index]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  // Pre-compute floating hearts for performance
  const floatingHearts = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 16 + 10}px`,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 8,
    })), []
  );

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <Confetti isExploding={showConfetti} isRaining={false} />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-background to-primary/10" />
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 via-rose/10 to-secondary/10" />
        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-b from-secondary/10 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-gold mb-4">
            The Party Continues...
          </h2>
          <p className="text-lg md:text-xl font-body text-muted-foreground italic">
            Each gift holds a special message, just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GiftBox
                message={msg.message}
                subMessage={msg.subMessage}
                variant={msg.variant}
                size="medium"
                onOpen={() => handleBoxOpen(index)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 md:mt-28 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6 md:p-10 rounded-3xl bg-card/30 backdrop-blur-md border border-secondary/20">
            <p className="text-xl md:text-2xl font-display italic text-foreground leading-relaxed">
              "I've got that summertime, summertime sadness..."
            </p>
            <p className="mt-3 text-base font-body text-muted-foreground">
              ...but today we only have summertime <span className="text-secondary">birthday gladness</span> ✨
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-rose/30 will-change-transform"
              style={{
                left: heart.left,
                fontSize: heart.fontSize,
              }}
              animate={{
                y: [800, -50],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
                ease: 'linear',
              }}
            >
              ♡
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartySection;
