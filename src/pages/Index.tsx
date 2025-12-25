"use client";

import React, { useState, useEffect } from 'react';
import { Play, Check, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  {
    id: 28,
    title: "How to Regulate Your Nervous System For Stress, Anxiety, And Trauma with Peter Levine",
    description: "10% Happier with Dan Harris",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/how-to-regulate-your-nervous-system-for-stress-anxiety/id1087147821?i=1000653595094"
  },
  {
    id: 29,
    title: "The Wheel of Consent Revolution with Dr. Betty Martin",
    description: "The Erotic Philosopher",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/the-wheel-of-consent-revolution-with-dr-betty-martin/id1525741635?i=1000571567907"
  },
  {
    id: 30,
    title: "Dr. Jack Feldman: Breathing for Mental & Physical Health & Performance",
    description: "Huberman Lab",
    category: "🧘 Voice, Body & Somatics",
    appleLink: "https://podcasts.apple.com/us/podcast/dr-jack-feldman-breathing-for-mental-physical-health/id1545953110?i=1000547400245"
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
  {
    id: 31,
    title: "Three Strategies for Getting Over Yourself with Joseph Goldstein",
    description: "10% Happier with Dan Harris",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/three-strategies-for-getting-over-yourself-joseph-goldstein/id1087147821?i=1000731139217"
  },
  {
    id: 32,
    title: "Meditation Party with Sebene Selassie and Jeff Warren",
    description: "10% Happier with Dan Harris",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/meditation-party-with-sebene-selassie-and-jeff/id1087147821?i=1000613124232"
  },
  {
    id: 33,
    title: "How To Handle Literally Anything with Sebene Selassie",
    description: "10% Happier with Dan Harris",
    category: "☸️ Consciousness & Meaning-Making",
    appleLink: "https://podcasts.apple.com/us/podcast/how-to-handle-literally-anything-sebene-selassie-and/id1087147821?i=1000652526353"
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
  {
    id: 34,
    title: "Rick Rubin on How to Make Something Great",
    description: "People I (Mostly) Admire",
    category: "🎨 Creative Process & Artistic Identity",
    appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-on-how-to-make-something-great-update/id1525936566?i=1000723160112"
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
  {
    id: 35,
    title: "How to Use Polyvagal Theory to Shift Your Nervous System with Deb Dana",
    description: "Your Life In Process",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/how-to-use-polyvagal-theory-to-shift-your-nervous-system/id1596820706?i=1000579913098"
  },
  {
    id: 36,
    title: "Introduction to Polyvagal Theory with Deb Dana",
    description: "the tara bixby podcast",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/141-deb-dana-introduction-to-polyvagal-theory/id1506417679?i=1000602246434"
  },
  {
    id: 37,
    title: "Polyvagal Theory and the Nervous System with Deb Dana",
    description: "The Third Place",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-and-the-nervous-system-with-deb-dana-ep-76/id1511577455?i=1000550675113"
  },
  {
    id: 38,
    title: "Polyvagal Theory for Trauma with Arielle Schwartz",
    description: "Evidence-Based Podcast",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-for-trauma-with-arielle-schwartz-phd/id1619983266?i=1000709131944"
  },
  {
    id: 39,
    title: "Finding Glimmers: A Polyvagal Approach with Deb Dana & Courtney Rolfe",
    description: "Therapy Chat",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/438-finding-glimmers-a-polyvagal-approach-with-deb/id1031099411?i=1000661233274"
  },
  {
    id: 40,
    title: "Peter Levine: Somatic Experiencing",
    description: "Grief is a Sneaky Bitch",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/peter-levine-somatic-experiencing/id1474558908?i=1000649700454"
  },
  {
    id: 41,
    title: "The Many Sides of Trauma with Peter Levine",
    description: "ManTalks Podcast",
    category: "⚖️ Systems, Ethics & Thinking Clearly",
    appleLink: "https://podcasts.apple.com/us/podcast/peter-levine-the-many-sides-of-trauma/id1015078747?i=1000658438132"
  },
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showNewCard, setShowNewCard] = useState(false);
  const [swipedLeftIds, setSwipedLeftIds] = useState<Set<number>>(new Set());

  // Load position from localStorage on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem('driveSafePodcastIndex');
    if (savedIndex !== null) {
      setCurrentIndex(parseInt(savedIndex, 10));
    }
    const savedSwipedLeft = localStorage.getItem('driveSafeSwipedLeft');
    if (savedSwipedLeft) {
      try {
        const parsed = JSON.parse(savedSwipedLeft);
        setSwipedLeftIds(new Set(parsed));
      } catch (e) {
        setSwipedLeftIds(new Set());
      }
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('driveSafePodcastIndex', currentIndex.toString());
  }, [currentIndex]);

  // Save swiped left IDs to localStorage
  useEffect(() => {
    localStorage.setItem('driveSafeSwipedLeft', JSON.stringify(Array.from(swipedLeftIds)));
  }, [swipedLeftIds]);

  const handlePlay = () => {
    const podcast = podcasts[currentIndex];
    if (podcast.appleLink) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
      window.location.href = podcast.appleLink;
    }
  };

  const swipeOffScreen = (direction: 'left' | 'right') => {
    setIsSwipingOut(true);
    setSwipeDirection(direction);
    setShowNewCard(false);
    
    // If swiping left, add to swiped set
    if (direction === 'left') {
      setSwipedLeftIds(prev => new Set(prev).add(podcasts[currentIndex].id));
    }
    
    // Card flies off screen
    const offScreenX = direction === 'right' ? window.innerWidth : -window.innerWidth;
    setDragDelta(offScreenX);
    
    // After animation, move to next
    setTimeout(() => {
      if (direction === 'left') {
        // Swipe LEFT = forward through numbering
        setCurrentIndex((prev) => (prev === podcasts.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe RIGHT = backward through numbering
        setCurrentIndex((prev) => (prev === 0 ? podcasts.length - 1 : prev - 1));
      }
      // Reset and trigger zoom
      setDragDelta(0);
      setIsSwipingOut(false);
      setSwipeDirection(null);
      setShowNewCard(true);
      
      // Hide zoom after animation
      setTimeout(() => {
        setShowNewCard(false);
      }, 300);
    }, 300);
  };

  const handleNext = () => {
    swipeOffScreen('left');
  };

  const handlePrevious = () => {
    swipeOffScreen('right');
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSwipingOut) return;
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    const currentX = e.touches[0].clientX;
    setDragDelta(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    
    if (Math.abs(dragDelta) > 100) {
      // Swipe LEFT = forward (next) = GREEN
      // Swipe RIGHT = back (previous) = RED
      if (dragDelta < 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    } else {
      // Snap back
      setDragDelta(0);
    }
    
    setDragStartX(null);
    setIsDragging(false);
  };

  // Mouse handlers for desktop
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
    if (!isDragging || dragStartX === null || isSwipingOut) return;
    
    if (Math.abs(dragDelta) > 100) {
      // Swipe LEFT = forward (next) = GREEN
      // Swipe RIGHT = back (previous) = RED
      if (dragDelta < 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    } else {
      setDragDelta(0);
    }
    
    setDragStartX(null);
    setIsDragging(false);
  };

  const currentPodcast = podcasts[currentIndex];
  const isCurrentSwipedLeft = swipedLeftIds.has(currentPodcast.id);

  // Calculate rotation based on drag
  const rotation = dragDelta * 0.05;
  const scale = Math.max(0.8, 1 - Math.abs(dragDelta) / 500);

  // Border color: GREEN for next (left swipe), RED for back (right swipe)
  const getBorderColor = () => {
    if (dragDelta > 50) {
      // Swiping right = BACK = RED
      return 'rgba(239, 68, 68, 0.8)';
    } else if (dragDelta < -50) {
      // Swiping left = NEXT = GREEN
      return 'rgba(16, 185, 129, 0.8)';
    }
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
      {/* Settings button */}
      <Link 
        to="/sync" 
        className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label="Sync podcasts"
      >
        <Settings className="w-5 h-5 text-gray-700" />
      </Link>

      {/* Background swipe indicators */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-6xl font-black opacity-0 transition-opacity duration-200"
             style={{ 
               opacity: dragDelta > 50 ? Math.min(0.4, dragDelta / 300) : 0,
               color: 'rgba(239, 68, 68, 0.8)' // RED for BACK
             }}>
          ← BACK
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl font-black opacity-0 transition-opacity duration-200"
             style={{ 
               opacity: dragDelta < -50 ? Math.min(0.4, Math.abs(dragDelta) / 300) : 0,
               color: 'rgba(16, 185, 129, 0.8)' // GREEN for NEXT
             }}>
          NEXT →
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light tracking-[0.5em] uppercase text-gray-900">
            Drive Safe
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mt-1">
            Swipe ← → to browse
          </p>
        </div>

        {/* Main Card - Tinder Style with border */}
        <div 
          className="relative rounded-2xl border-4"
          style={{
            borderColor: getBorderColor(),
            transform: showNewCard ? 'scale(0)' : `translateX(${dragDelta}px) rotate(${rotation}deg) scale(${scale})`,
            transition: isSwipingOut ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : (isDragging ? 'none' : 'transform 0.3s ease'),
            opacity: 1 // No fade
          }}
        >
          {/* Category */}
          <div className="text-center mb-4 relative z-10">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
              {currentPodcast.category}
            </span>
          </div>

          {/* Content */}
          <div className="text-center space-y-4 mb-8 relative z-10 bg-white rounded-2xl p-6">
            <h2 className="text-3xl md:text-4xl font-light leading-tight text-gray-900">
              {currentPodcast.title}
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
              {currentPodcast.description}
            </p>
            {currentPodcast.searchTerms && (
              <p className="text-xs font-mono text-gray-400">
                {currentPodcast.searchTerms}
              </p>
            )}
          </div>

          {/* Play Button */}
          <div className="flex justify-center mb-8 relative z-10">
            <button
              onClick={handlePlay}
              className={`
                w-48 h-48 rounded-full 
                ${isCurrentSwipedLeft ? 'bg-green-500 hover:bg-green-600' : 'bg-black hover:bg-gray-900'}
                text-white
                transform transition-all duration-200
                ${isPlaying ? 'scale-90' : 'hover:scale-105 active:scale-95'}
                flex items-center justify-center
                shadow-xl
              `}
              aria-label="Play podcast"
            >
              <div className="flex flex-col items-center gap-2">
                {isCurrentSwipedLeft ? (
                  <Check className="w-16 h-16 fill-current" />
                ) : (
                  <Play className="w-16 h-16 fill-current" />
                )}
                <span className="text-xs font-medium tracking-[0.3em]">
                  {isCurrentSwipedLeft ? 'SWIPED' : 'PLAY'}
                </span>
              </div>
            </button>
          </div>

          {/* Counter */}
          <div className="text-center text-xs text-gray-400 tracking-[0.2em] relative z-10">
            {currentIndex + 1} / {podcasts.length}
          </div>
        </div>

        {/* Visual Swipe Hint */}
        <div className="flex justify-between items-center mt-8 opacity-30">
          <div className="text-gray-400 text-xs font-light">← BACK</div>
          <div className="text-gray-400 text-xs font-light">NEXT →</div>
        </div>
      </div>
    </div>
  );
};

export default Index;