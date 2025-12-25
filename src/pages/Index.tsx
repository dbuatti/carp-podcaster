"use client";

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check } from 'lucide-react'; // Import Check icon

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
  const [swipeDirection, setSwipeDirection] = useState<'next' | 'prev' | null>(null);
  const [tickedPodcasts, setTickedPodcasts] = useState<Set<number>>(new Set());

  // Persist progress
  useEffect(() => {
    const savedIndex = localStorage.getItem('driveSafePodcastIndex');
    if (savedIndex !== null) setCurrentIndex(parseInt(savedIndex, 10));

    const savedTicked = localStorage.getItem('driveSafeTickedPodcasts');
    if (savedTicked) setTickedPodcasts(new Set(JSON.parse(savedTicked)));

    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    localStorage.setItem('driveSafePodcastIndex', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('driveSafeTickedPodcasts', JSON.stringify(Array.from(tickedPodcasts)));
  }, [tickedPodcasts]);

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
      localStorage.removeItem('driveSafeTickedPodcasts');
      setCurrentIndex(0);
      setTickedPodcasts(new Set());
    }
  };

  const swipeOffScreen = (direction: 'left' | 'right') => {
    if (isSwipingOut) return;

    setIsSwipingOut(true);
    const dir = direction === 'left' ? 'next' : 'prev';
    setSwipeDirection(dir);

    const offScreenX = direction === 'left' ? -window.innerWidth : window.innerWidth;
    setDragDelta(offScreenX);

    // Mark as ticked only when swiping left (NEXT)
    if (direction === 'left') {
      setTickedPodcasts(prev => new Set(prev).add(podcasts[currentIndex].id));
    }

    setTimeout(() => {
      setCurrentIndex(prev => 
        dir === 'next' 
          ? (prev === podcasts.length - 1 ? 0 : prev + 1)
          : (prev === 0 ? podcasts.length - 1 : prev - 1)
      );
      setDragDelta(0);
      setIsSwipingOut(false);
      setSwipeDirection(null);
    }, 400); // Match transition duration below
  };

  const handleNext = () => swipeOffScreen('left');
  const handlePrevious = () => swipeOffScreen('right');

  // Touch & Mouse handlers
  const handleStart = (clientX: number) => {
    if (isSwipingOut) return;
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    setDragDelta(clientX - dragStartX);
  };

  const handleEnd = () => {
    if (!isDragging || dragStartX === null) return;

    if (Math.abs(dragDelta) > 120) {
      dragDelta < 0 ? handleNext() : handlePrevious();
    } else {
      setDragDelta(0); // Snap back
    }

    setIsDragging(false);
    setDragStartX(null);
  };

  const currentPodcast = podcasts[currentIndex];
  const isTicked = tickedPodcasts.has(currentPodcast.id);

  const handleToggleTick = () => {
    setTickedPodcasts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentPodcast.id)) {
        newSet.delete(currentPodcast.id);
      } else {
        newSet.add(currentPodcast.id);
      }
      return newSet;
    });
  };

  // Tinder-style visual effects
  const rotation = dragDelta * 0.06; // Slight rotation based on drag
  const opacity = isSwipingOut ? 0 : Math.max(0.6, 1 - Math.abs(dragDelta) / 400);

  // Incoming card animation state
  const [incomingFrom, setIncomingFrom] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (swipeDirection) {
      setIncomingFrom(swipeDirection === 'next' ? 'right' : 'left');
    }
  }, [currentIndex, swipeDirection]);

  const getBorderColor = () => {
    if (dragDelta > 80) return 'rgba(239, 68, 68, 0.9)'; // Red for BACK
    if (dragDelta < -80) return 'rgba(34, 197, 94, 0.9)'; // Green for NEXT
    return 'rgba(0, 0, 0, 0.1)';
  };

  const cardBackgroundColor = currentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden select-none"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="absolute top-6 left-6 z-30 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition"
        aria-label="Reset progress"
      >
        <RotateCcw className="w-5 h-5 text-gray-700" />
      </button>

      {/* Swipe Indicators */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div
          className="absolute left-12 top-1/2 -translate-y-1/2 text-7xl font-black transition-all duration-300"
          style={{
            opacity: dragDelta > 80 ? Math.min(0.6, dragDelta / 300) : 0,
            color: 'rgb(239, 68, 68)',
            transform: `translateX(${dragDelta > 0 ? dragDelta / 4 : 0}px)`,
          }}
        >
          BACK
        </div>
        <div
          className="absolute right-12 top-1/2 -translate-y-1/2 text-7xl font-black transition-all duration-300"
          style={{
            opacity: dragDelta < -80 ? Math.min(0.6, Math.abs(dragDelta) / 300) : 0,
            color: 'rgb(34, 197, 94)',
            transform: `translateX(${dragDelta < 0 ? dragDelta / 4 : 0}px)`,
          }}
        >
          NEXT
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto px-6 relative h-full flex flex-col justify-center">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-[0.6em] uppercase text-gray-800">Drive Safe</h1>
          <p className="text-sm tracking-[0.4em] uppercase text-gray-500 mt-2">Swipe to browse</p>
        </div>

        {/* Card Stack Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Incoming Card (behind, slides in) */}
          {incomingFrom && (
            <div
              className={`absolute inset-0 rounded-2xl border-4 shadow-2xl ${cardBackgroundColor} transition-all duration-400 ease-out`}
              style={{
                transform: `translateX(${incomingFrom === 'right' ? '100%' : '-100%'})`,
                opacity: 0,
                animation: 'slideIn 0.4s ease-out forwards',
              }}
            />
          )}

          {/* Current Card */}
          <div
            key={currentPodcast.id}
            className={`relative rounded-2xl border-4 shadow-2xl ${cardBackgroundColor} transition-all`}
            style={{
              transform: isDragging || isSwipingOut
                ? `translateX(${dragDelta}px) rotate(${rotation}deg)`
                : incomingFrom
                ? 'translateX(0px) rotate(0deg)'
                : 'translateX(0px)',
              opacity,
              transition: isDragging
                ? 'none'
                : 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.4s ease-out',
              borderColor: getBorderColor(),
              zIndex: 10,
            }}
          >
            <style jsx>{`
              @keyframes slideIn {
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>

            <div className="text-center pt-10 px-8">
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-gray-500">
                {currentPodcast.category}
              </span>
            </div>

            <div className="text-center space-y-6 my-10 px-8">
              <h2 className="text-4xl font-light leading-tight text-gray-900">
                {currentPodcast.title}
              </h2>
              <p className="text-xl font-light text-gray-700 leading-relaxed">
                {currentPodcast.description}
              </p>
              {currentPodcast.searchTerms && (
                <p className="text-sm font-mono text-gray-500 mt-4">{currentPodcast.searchTerms}</p>
              )}
            </div>

            <div className="flex justify-center my-12">
              <button
                onClick={isTicked ? handleToggleTick : handlePlay}
                className={`
                  w-56 h-56 rounded-full ${isTicked ? 'bg-green-500' : 'bg-black'} text-white
                  hover:${isTicked ? 'bg-green-600' : 'bg-gray-900'} transition-all duration-300
                  ${isPlaying ? 'scale-95' : 'hover:scale-110 active:scale-95'}
                  flex flex-col items-center justify-center shadow-2xl
                `}
                aria-label={isTicked ? "Untick" : "Play"}
              >
                {isTicked ? (
                  <Check className="w-20 h-20" />
                ) : (
                  <Play className="w-20 h-20 ml-4" />
                )}
                <span className="text-sm font-medium tracking-[0.4em] mt-3">
                  {isTicked ? 'TICKED' : 'PLAY'}
                </span>
              </button>
            </div>

            <div className="text-center text-sm text-gray-500 tracking-[0.3em] pb-10">
              {currentIndex + 1} / {podcasts.length}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 px-8 opacity-40">
          <div className="text-gray-500 text-sm">← BACK</div>
          <div className="text-gray-500 text-sm">NEXT →</div>
        </div>
      </div>
    </div>
  );
};

export default Index;