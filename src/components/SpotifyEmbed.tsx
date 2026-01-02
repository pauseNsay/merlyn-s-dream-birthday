import { motion } from 'framer-motion';
import { useState } from 'react';

const SpotifyEmbed = () => {
  const [showSpotify, setShowSpotify] = useState(false);

  return (
    <motion.div
      className="w-full max-w-xl mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-center text-sm font-body text-muted-foreground mb-4">
        🎵 Listen to More Lana Del Rey on Spotify
      </p>
      
      {!showSpotify ? (
        <motion.button
          onClick={() => setShowSpotify(true)}
          className="w-full py-6 px-8 rounded-xl bg-gradient-to-r from-secondary/20 to-rose/20 hover:from-secondary/30 hover:to-rose/30 transition-all duration-300 shadow-lg hover:shadow-xl border border-secondary/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <p className="text-lg font-display text-secondary">Click to Load Spotify Player</p>
          </div>
          <p className="text-sm font-body text-muted-foreground italic">
            Lana Del Rey - This Is Lana Del Rey
          </p>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO05tE88?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SpotifyEmbed;
