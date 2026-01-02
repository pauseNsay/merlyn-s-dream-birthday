import { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Music, Heart } from 'lucide-react';
import RecordPlayer3D from './RecordPlayer3D';
import SpotifyEmbed from './SpotifyEmbed';

// Lana Del Rey tracks with album info
const tracks = [
  {
    title: 'Video Games',
    artist: 'Lana Del Rey',
    album: 'Born to Die',
    youtubeId: 'cE6wxDqdOV0',
    color: '#8B4513',
  },
  {
    title: 'Summertime Sadness',
    artist: 'Lana Del Rey',
    album: 'Born to Die',
    youtubeId: 'TdrL3QxjyVw',
    color: '#DC143C',
  },
  {
    title: 'Young and Beautiful',
    artist: 'Lana Del Rey',
    album: 'The Great Gatsby',
    youtubeId: 'o_1aF54DO60',
    color: '#FFD700',
  },
  {
    title: 'Born to Die',
    artist: 'Lana Del Rey',
    album: 'Born to Die',
    youtubeId: 'Bag1gUxuU0g',
    color: '#800020',
  },
  {
    title: 'Blue Jeans',
    artist: 'Lana Del Rey',
    album: 'Born to Die',
    youtubeId: 'JRWox-i6aAk',
    color: '#000080',
  },
];

export interface MusicSectionHandle {
  playMusic: () => void;
}

const MusicSection = forwardRef<MusicSectionHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (!hasAutoPlayed) {
        setHasAutoPlayed(true);
        
        setTimeout(() => {
          const iframe = iframeRefs.current[0];
          if (iframe) {
            iframe.contentWindow?.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            );
            setIsPlaying(true);
          }
        }, 50);
        
        autoplayTimerRef.current = setTimeout(() => {
          const iframe = iframeRefs.current[0];
          if (iframe) {
            iframe.contentWindow?.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              '*'
            );
            setIsPlaying(false);
          }
        }, 10000);
      }
    },
  }));

  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    const iframe = iframeRefs.current[currentTrack];
    if (iframe) {
      if (isPlaying) {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      } else {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    tracks.forEach((_, index) => {
      const iframe = iframeRefs.current[index];
      if (iframe) {
        if (isMuted) {
          iframe.contentWindow?.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            '*'
          );
        } else {
          iframe.contentWindow?.postMessage(
            '{"event":"command","func":"mute","args":""}',
            '*'
          );
        }
      }
    });
    setIsMuted(!isMuted);
  };

  const switchTrack = (newTrack: number) => {
    // Pause current track
    const currentIframe = iframeRefs.current[currentTrack];
    if (currentIframe) {
      currentIframe.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    }

    // Switch track
    setCurrentTrack(newTrack);

    // Play new track if was playing
    if (isPlaying) {
      setTimeout(() => {
        const newIframe = iframeRefs.current[newTrack];
        if (newIframe) {
          newIframe.contentWindow?.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
      }, 50);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    switchTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    switchTrack(prev);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Preload ALL tracks as hidden iframes for instant switching */}
      {tracks.map((track, index) => (
        <iframe
          key={track.youtubeId}
          ref={(el) => (iframeRefs.current[index] = el)}
          className="hidden"
          src={`https://www.youtube.com/embed/${track.youtubeId}?enablejsapi=1&controls=0`}
          title={track.title}
          allow="autoplay; encrypted-media"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background via-midnight to-background z-0" />

      {/* Floating Album Covers */}
      {tracks.map((track, index) => (
        <motion.div
          key={`album-${index}`}
          className="absolute w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg opacity-20 z-0"
          style={{
            background: `linear-gradient(135deg, ${track.color} 0%, ${track.color}99 100%)`,
            left: `${10 + index * 18}%`,
            top: `${20 + (index % 2) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white/40 font-display text-xs">
            LDR
          </div>
        </motion.div>
      ))}

      <div className="absolute top-10 left-10 text-secondary/20">
        <Music className="w-12 h-12 md:w-16 md:h-16" />
      </div>
      <div className="absolute bottom-10 right-10 text-rose/20">
        <Heart className="w-10 h-10 md:w-12 md:h-12" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-romantic mb-4">
            The Soundtrack of Your Day
          </h2>
          <p className="text-lg md:text-xl font-body text-muted-foreground italic max-w-xl mx-auto">
            Because every birthday queen deserves her own cinematic moment
          </p>
        </motion.div>

        <RecordPlayer3D isPlaying={isPlaying} />

        <div className="flex justify-center items-center gap-4 mt-6">
          <motion.button
            onClick={prevTrack}
            className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipBack className="w-5 h-5 text-foreground" />
          </motion.button>

          <motion.button
            onClick={togglePlay}
            className="p-4 rounded-full bg-secondary hover:bg-secondary/80 transition-colors glow-gold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-secondary-foreground" />
            ) : (
              <Play className="w-6 h-6 text-secondary-foreground ml-0.5" />
            )}
          </motion.button>

          <motion.button
            onClick={nextTrack}
            className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-5 h-5 text-foreground" />
          </motion.button>

          <motion.button
            onClick={toggleMute}
            className="p-3 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-foreground" />
            ) : (
              <Volume2 className="w-5 h-5 text-foreground" />
            )}
          </motion.button>
        </div>

        <motion.div
          className="mt-6 text-center"
          key={currentTrack}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-secondary font-display text-lg">Now Playing</p>
          <p className="text-foreground font-body text-xl mt-1">{tracks[currentTrack].title}</p>
          <p className="text-muted-foreground font-body italic">{tracks[currentTrack].artist}</p>
          <p className="text-muted-foreground/60 font-body text-sm mt-1">{tracks[currentTrack].album}</p>
        </motion.div>

        <div className="flex justify-center gap-1 mt-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-secondary rounded-full will-change-transform"
              animate={{
                height: isPlaying ? [8, Math.random() * 20 + 8, 8] : 8,
              }}
              transition={{
                duration: 0.4,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        <SpotifyEmbed />

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm md:text-base font-body text-muted-foreground/60 italic">
            "Blue jeans, white shirt, walked into the room... and it's your birthday" ✧
          </p>
        </motion.div>
      </div>
    </section>
  );
});

MusicSection.displayName = 'MusicSection';

export default MusicSection;
