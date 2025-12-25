"use client";

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface PodcastType {
  id: number;
  title: string;
  description: string;
  category: string;
  appleLink: string;
  searchTerms?: string;
}

const podcasts: PodcastType[] = [
  // Voice, Body & Somatics
  {
    id: 1,
    title: "Interpretation vs Inhabitation",
    description: "This Is A Voice - Discussion around 30:30 mark",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/this-is-a-voice/id1522020103",
    searchTerms: "Interpretation versus Inhabitation"
  },
  {
    id: 2,
    title: "Healing After Trauma with Dr. Peter Levine",
    description: "Being Well with Forrest Hanson and Dr. Rick Hanson",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/healing-after-trauma-with-dr-peter-levine/id1120885936?i=1000653898932"
  },
  {
    id: 3,
    title: "The Art of Receiving and Giving (Wheel of Consent)",
    description: "Sex Birth Trauma",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/the-art-of-receiving-and-giving-the-wheel/id1286485146?i=1000731393085"
  },
  {
    id: 4,
    title: "Is this Burnout? Polyvagal Theory",
    description: "This Is A Voice - Check main feed",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/this-is-a-voice/id1522020103",
    searchTerms: "Burnout Polyvagal Performing Arts"
  },
  {
    id: 5,
    title: "How to Breathe Correctly",
    description: "Huberman Lab - Optimal Health & Mood",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/how-to-breathe-correctly-for-optimal-health-mood-learning/id1545953110?i=1000600532657"
  },
  {
    id: 6,
    title: "Polyvagal Theory with Dr. Stephen Porges",
    description: "Being Well with Forrest Hanson and Dr. Rick Hanson",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-with-dr-stephen-porges/id1120885936?i=1000485497017"
  },
  {
    id: 7,
    title: "Dr. Jack Feldman: Breathing for Performance",
    description: "Huberman Lab",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/dr-jack-feldman-breathing-for-mental-physical-health/id1545953110?i=1000547400245"
  },
  {
    id: 8,
    title: "The Wheel of Consent with Dr. Betty Martin",
    description: "Sex Birth Trauma",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/the-art-of-receiving-and-giving-the-wheel/id1286485146?i=1000731393085"
  },

  // Consciousness & Meaning-Making
  {
    id: 9,
    title: "Nick Cave: Loss, Yearning, Transcendence",
    description: "On Being with Krista Tippett - Search in feed",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/on-being-with-krista-tippett/id15125565?i=1000473456789",
    searchTerms: "Nick Cave On Being"
  },
  {
    id: 10,
    title: "How to Get Out of Your Head",
    description: "10% Happier - Joseph Goldstein & Sam Harris",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821",
    searchTerms: "Joseph Goldstein Sam Harris"
  },
  {
    id: 11,
    title: "Marie Howe: The Language of the Body",
    description: "Poetry Unbound",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/poetry-unbound/id1492928827",
    searchTerms: "Marie Howe"
  },
  {
    id: 12,
    title: "Sebene Selassie: Non-Attached",
    description: "10% Happier with Dan Harris",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821",
    searchTerms: "Sebene Selassie"
  },
  {
    id: 13,
    title: "The Art of Not Clinging",
    description: "Wisdom of the Sages - Search in feed",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/wisdom-of-the-sages/id15125565",
    searchTerms: "Art of Not Clinging"
  },
  {
    id: 14,
    title: "Joseph Goldstein: How Not to Try Too Hard",
    description: "10% Happier",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/joseph-goldstein-on-how-not-to-try-too-hard-in-meditation/id1087147821?i=1000612420520"
  },
  {
    id: 15,
    title: "Joseph Goldstein: Impermanence",
    description: "10% Happier",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/joseph-goldstein-on-impermanence-impersonality-and/id1087147821?i=1000683225660"
  },

  // Creative Process & Artistic Identity
  {
    id: 16,
    title: "Rick Rubin: The Creative Act",
    description: "Design Matters with Debbie Millman",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin/id328074695?i=1000603914256"
  },
  {
    id: 17,
    title: "Rick Rubin: Modern Master",
    description: "The Rich Roll Podcast",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-modern-master-of-the-creative-act/id582272991?i=1000594651321"
  },
  {
    id: 18,
    title: "Rick Rubin: Allowing vs Willing",
    description: "The Daily Stoic",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-on-the-creative-act/id1430315931?i=1000600932644"
  },
  {
    id: 19,
    title: "Rick Rubin: Protocols for Creative Energy",
    description: "Huberman Lab",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-protocols-to-access-creative-energy-and-process/id1545953110?i=1000639648788"
  },
  {
    id: 20,
    title: "Company with Elizabeth Day",
    description: "Sentimental Garbage - Sondheim analysis",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/sentimental-garbage/id1372827605",
    searchTerms: "Elizabeth Day Sondheim"
  },

  // Systems, Ethics & Thinking Clearly
  {
    id: 21,
    title: "Jocelyn K. Glei: Tyranny of Urgency",
    description: "Hurry Slowly",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/hurry-slowly/id1272852250",
    searchTerms: "Tyranny of Urgency"
  },
  {
    id: 22,
    title: "Rethinking Your Identity",
    description: "Re:Thinking with Adam Grant",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/rethinking-with-adam-grant/id1528594034",
    searchTerms: "Rethinking Identity"
  },
  {
    id: 23,
    title: "Jon Ronson on Shame and Power",
    description: "Conversations (ABC Australia)",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/conversations/id94688506",
    searchTerms: "Jon Ronson Shame Power"
  },
  {
    id: 24,
    title: "Why You're Always Half-Stressed",
    description: "10% Happier - Yellow Mode",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821",
    searchTerms: "Half Stressed Yellow Mode"
  },
  {
    id: 25,
    title: "Kristina Casale: Power of Community Singing",
    description: "The Vocal Lab Collective",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/the-vocal-lab-collective/id1536083499",
    searchTerms: "Kristina Casale Community Singing"
  },
  {
    id: 26,
    title: "Deb Dana: Polyvagal Theory",
    description: "Therapist Uncensored",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/therapist-uncensored/id1286485146",
    searchTerms: "Deb Dana Polyvagal"
  },
  {
    id: 27,
    title: "Polyvagal Theory and Trauma",
    description: "Transforming Trauma",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/transforming-trauma/id1496190024",
    searchTerms: "Polyvagal Theory Trauma"
  },
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipingOut, setIsSwipingOut] = useState(false);

  // Load current index from localStorage
  useEffect(() => {
    const savedIndex = localStorage.getItem('driveSafePodcastIndex');
    if (savedIndex !== null) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Save current index whenever it changes (this tracks "ticked" progress)
  useEffect(() => {
    localStorage.setItem('driveSafePodcastIndex', currentIndex.toString());
  }, [currentIndex]);

  const handlePlay = () => {
    const podcast = podcasts[currentIndex];
    if (podcast.appleLink) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
      window.location.href = podcast.appleLink;
    }
  };

  const handleReset = () => {
    if (confirm('Reset your ticked progress? This will clear your history and start fresh from the first podcast.')) {
      localStorage.removeItem('driveSafePodcastIndex');
      setCurrentIndex(0);
    }
  };

  const swipeOffScreen = (direction: 'left' | 'right') => {
    setIsSwipingOut(true);

    const offScreenX = direction === 'right' ? window.innerWidth : -window.innerWidth;
    setDragDelta(offScreenX);

    setTimeout(() => {
      if (direction === 'left') {
        // Swipe left = NEXT (forward)
        setCurrentIndex((prev) => (prev === podcasts.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe right = PREVIOUS (back)
        setCurrentIndex((prev) => (prev === 0 ? podcasts.length - 1 : prev - 1));
      }

      // Reset drag state
      setDragDelta(0);
      setIsSwipingOut(false);
    }, 300);
  };

  const handleNext = () => swipeOffScreen('left');
  const handlePrevious = () => swipeOffScreen('right');

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSwipingOut) return;
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    setDragDelta(e.touches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || dragStartX === null) return;

    if (Math.abs(dragDelta) > 100) {
      dragDelta < 0 ? handleNext() : handlePrevious();
    } else {
      setDragDelta(0);
    }

    setDragStartX(null);
    setIsDragging(false);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSwipingOut) return;
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    setDragDelta(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    handleTouchEnd(); // Reuse logic
  };

  const currentPodcast = podcasts[currentIndex];

  // Visual calculations
  const rotation = dragDelta * 0.05;
  const scale = Math.max(0.85, 1 - Math.abs(dragDelta) / 600);

  const getCardStyle = () => {
    const baseTransform = `translateX(${dragDelta}px) rotate(${rotation}deg) scale(${scale})`;

    if (isDragging) {
      return { transform: baseTransform, transition: 'none' };
    }

    if (isSwipingOut) {
      return { transform: baseTransform, transition: 'transform 0.3s ease-out', opacity: 0 };
    }

    // New card appearance — smooth bouncy entrance
    return {
      transform: baseTransform,
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      opacity: 1,
    };
  };

  const getBorderColor = () => {
    if (dragDelta > 50) return 'rgba(239, 68, 68, 0.8)'; // Red = back
    if (dragDelta < -50) return 'rgba(16, 185, 129, 0.8)'; // Green = next
    return 'rgba(0, 0, 0, 0.1)';
  };

  return (
    <div
      className="fixed inset-0 bg-white flex items-center justify-center overflow-hidden touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="absolute top-4 left-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label="Reset ticked progress"
      >
        <RotateCcw className="w-5 h-5 text-gray-700" />
      </button>

      {/* Swipe Indicators */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 text-6xl font-black transition-opacity duration-200"
          style={{ opacity: dragDelta > 50 ? Math.min(0.4, dragDelta / 300) : 0, color: 'rgba(239, 68, 68, 0.8)' }}
        >
          ← BACK
        </div>
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl font-black transition-opacity duration-200"
          style={{ opacity: dragDelta < -50 ? Math.min(0.4, Math.abs(dragDelta) / 300) : 0, color: 'rgba(16, 185, 129, 0.8)' }}
        >
          NEXT →
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-[0.5em] uppercase text-gray-900">Drive Safe</h1>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mt-1">Swipe ← → to browse</p>
        </div>

        {/* Main Card */}
        <div
          className="relative rounded-2xl border-4 bg-white shadow-2xl"
          style={{
            ...getCardStyle(),
            borderColor: getBorderColor(),
          }}
        >
          <div className="text-center pt-8 px-6">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
              {currentPodcast.category}
            </span>
          </div>

          <div className="text-center space-y-4 my-8 px-6">
            <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-900">
              {currentPodcast.title}
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
              {currentPodcast.description}
            </p>
            {currentPodcast.searchTerms && (
              <p className="text-xs font-mono text-gray-400">{currentPodcast.searchTerms}</p>
            )}
          </div>

          <div className="flex justify-center my-8">
            <button
              onClick={handlePlay}
              className={`
                w-48 h-48 rounded-full bg-black text-white
                hover:bg-gray-900 transform transition-all duration-200
                ${isPlaying ? 'scale-90' : 'hover:scale-105 active:scale-95'}
                flex items-center justify-center shadow-xl
              `}
              aria-label="Play podcast"
            >
              <div className="flex flex-col items-center gap-2">
                <Play className="w-16 h-16 fill-current" />
                <span className="text-xs font-medium tracking-[0.3em]">PLAY</span>
              </div>
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 tracking-[0.2em] pb-8">
            {currentIndex + 1} / {podcasts.length}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 opacity-30 px-4">
          <div className="text-gray-400 text-xs font-light">← BACK</div>
          <div className="text-gray-400 text-xs font-light">NEXT →</div>
        </div>
      </div>
    </div>
  );
};

export default Index;