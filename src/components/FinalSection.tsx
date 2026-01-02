import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const FinalSection = forwardRef<HTMLElement>((_, ref) => {
  // Reduced stars for performance
  const stars = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    })), []
  );

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background z-0" />

      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-secondary/30 will-change-transform"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            <Star className="w-2 h-2 md:w-3 md:h-3 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="mb-10">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-12 h-12 md:w-14 md:h-14 text-rose fill-rose/50" />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-gold">Merlyn,</span>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl font-body text-foreground leading-relaxed mb-4">
              On this special day and every day after,
            </p>

            <p className="text-lg md:text-xl lg:text-2xl font-body text-foreground leading-relaxed">
              may your life be filled with as much love, joy, and magic
              as you bring to everyone around you.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-3 my-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-secondary" />
            <Sparkles className="w-5 h-5 text-secondary" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-secondary" />
          </motion.div>

          <motion.div
            className="p-6 md:p-10 rounded-3xl bg-card/40 backdrop-blur-md border border-secondary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg md:text-xl font-display italic text-foreground/90 mb-3">
              "You're born to be real, not to be perfect"
            </p>
            <p className="text-base font-body text-muted-foreground">
              But you somehow manage to be both ✨
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-base font-body italic text-muted-foreground">
              With all the love in the world,
            </p>
            <p className="text-xl md:text-2xl font-display text-secondary mt-2">
              Happy Birthday 🎂
            </p>
          </motion.div>

          <div className="mt-8 flex justify-center gap-3 text-xl md:text-2xl">
            {['🌹', '✨', '🎉', '💕', '🦋', '🌙'].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FinalSection.displayName = 'FinalSection';

export default FinalSection;
