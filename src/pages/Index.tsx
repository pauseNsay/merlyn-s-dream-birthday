import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '@/components/FloatingParticles';
import Confetti from '@/components/Confetti';
import HeroSection from '@/components/HeroSection';
import PartySection from '@/components/PartySection';
import MusicSection, { MusicSectionHandle } from '@/components/MusicSection';
import FinalSection from '@/components/FinalSection';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const musicRef = useRef<MusicSectionHandle>(null);

  useEffect(() => {
    document.title = "Happy Birthday Merlyn ✨ | A Dreamy Celebration";
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  const handleGiftOpened = () => {
    // Start music when gift is opened
    musicRef.current?.playMusic();
  };

  return (
    <>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <AnimatePresence>
          {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FloatingParticles />
              <Confetti isRaining={true} />
              <HeroSection onGiftOpened={handleGiftOpened} />
              <PartySection />
              <MusicSection ref={musicRef} />
              <FinalSection />

              <footer className="relative z-10 py-6 text-center">
                <p className="text-sm font-body text-muted-foreground/50">
                  Made with 💕 for Merlyn's special day
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Index;
