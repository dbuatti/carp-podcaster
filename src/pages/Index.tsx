"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Podcast } from 'lucide-react';
import { toast } from 'sonner';

interface PodcastType {
  id: number;
  title: string;
  description: string;
  category: string;
  appleLink: string;
  searchTerms?: string;
}

interface CategoryStyle {
  bg: string;
  text: string;
  accent: string;
  accentText: string;
  button: string;
  buttonHover: string;
  glow: string;
  ring: string;
  border: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  "🧘 Voice, Body & Somatics": {
    bg: "from-emerald-600 via-teal-700 to-emerald-800",
    text: "text-emerald-100",
    accent: "bg-emerald-400",
    accentText: "text-emerald-900",
    button: "bg-emerald-400 hover:bg-emerald-300 text-emerald-900",
    buttonHover: "bg-emerald-300",
    glow: "shadow-[0_0_80px_rgba(52,211,153,0.6)]",
    ring: "ring-emerald-400/50",
    border: "border-emerald-400"
  },
  "☸️ Consciousness & Meaning-Making": {
    bg: "from-purple-600 via-fuchsia-700 to-purple-800",
    text: "text-purple-100",
    accent: "bg-purple-400",
    accentText: "text-purple-900",
    button: "bg-purple-400 hover:bg-purple-300 text-purple-900",
    buttonHover: "bg-purple-300",
    glow: "shadow-[0_0_80px_rgba(192,132,252,0.6)]",
    ring: "ring-purple-400/50",
    border: "border-purple-400"
  },
  "🎨 Creative Process & Artistic Identity": {
    bg: "from-orange-600 via-amber-700 to-orange-800",
    text: "text-orange-100",
    accent: "bg-orange-400",
    accentText: "text-orange-900",
    button: "bg-orange-400 hover:bg-orange-300 text-orange-900",
    buttonHover: "bg-orange-300",
    glow: "shadow-[0_0_80px_rgba(251,146,60,0.6)]",
    ring: "ring-orange-400/50",
    border: "border-orange-400"
  },
  "⚖️ Systems, Ethics & Thinking Clearly": {
    bg: "from-blue-600 via-cyan-700 to-blue-800",
    text: "text-blue-100",
    accent: "bg-blue-400",
    accentText: "text-blue-900",
    button: "bg-blue-400 hover:bg-blue-300 text-blue-900",
    buttonHover: "bg-blue-300",
    glow: "shadow-[0_0_80px_rgba(96,165,250,0.6)]",
    ring: "ring-blue-400/50",
    border: "border-blue-400"
  }
};

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

  const handlePlay = () => {
    const podcast = podcasts[currentIndex];
    if (podcast.appleLink) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
      window.location.href = podcast.appleLink;
      toast.info('Opening in Apple Podcasts...', {
        duration: 3000,
      });
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? podcasts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === podcasts.length - 1 ? 0 : prev + 1));
  };

  const currentPodcast = podcasts[currentIndex];
  const styles = categoryStyles[currentPodcast.category];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${styles.bg} p-3 md:p-6 flex items-center justify-center overflow-hidden relative`}>
      {/* Artistic background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-white/30 rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-white/20 rotate-12"></div>
      </div>

      <div className="max-w-2xl w-full mx-auto space-y-4 md:space-y-6 relative z-10">
        
        {/* Artistic Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Podcast className="w-6 h-6 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
              Drive Safe
            </h1>
          </div>
          <p className={`${styles.text} opacity-70 text-xs md:text-sm tracking-widest uppercase`}>
            Long Drives Made Better
          </p>
        </div>

        {/* Category - Bold Banner */}
        <div className={`text-center ${styles.accent} ${styles.accentText} py-3 rounded-lg font-black text-sm tracking-widest uppercase mx-4`}>
          {currentPodcast.category}
        </div>

        {/* Podcast Card - Artistic Layout */}
        <div className={`${styles.border} border-4 rounded-3xl p-6 md:p-8 min-h-[240px] flex flex-col justify-center bg-black/20 backdrop-blur-sm`}>
          <div className={`${styles.text} text-xs font-bold tracking-[0.3em] uppercase mb-3 opacity-80`}>
            Episode {currentIndex + 1}
          </div>
          <h2 className={`${styles.text} text-2xl md:text-3xl font-black leading-tight mb-3`}>
            {currentPodcast.title}
          </h2>
          <p className={`${styles.text} text-lg md:text-xl font-semibold leading-relaxed opacity-90`}>
            {currentPodcast.description}
          </p>
          {currentPodcast.searchTerms && (
            <div className="mt-3 text-xs opacity-60 font-mono">
              {currentPodcast.searchTerms}
            </div>
          )}
        </div>

        {/* MASSIVE CIRCULAR PLAY BUTTON */}
        <div className="flex justify-center py-4">
          <button
            onClick={handlePlay}
            className={`
              w-52 h-52 md:w-64 md:h-64 rounded-full 
              ${styles.button} 
              text-black
              ${styles.glow}
              transform transition-all duration-200
              ${isPlaying ? 'scale-90 rotate-180' : 'hover:scale-105 active:scale-95'}
              flex items-center justify-center
              relative overflow-hidden
              ring-8 ${styles.ring}
              active:ring-12
              touch-manipulation
              shadow-2xl
            `}
            aria-label="Play podcast"
          >
            <div className="absolute inset-0 bg-white/30 active:bg-white/50 transition-opacity"></div>
            <div className="relative flex flex-col items-center gap-4">
              <Play className="w-24 h-24 md:w-32 md:h-32 fill-current" />
              <span className="text-base md:text-lg font-black uppercase tracking-[0.5em]">PLAY</span>
            </div>
          </button>
        </div>

        {/* Navigation - Side by Side, Massive */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <Button
            onClick={handlePrevious}
            size="lg"
            className={`
              h-32 md:h-40 text-2xl md:text-3xl font-black 
              bg-white/90 hover:bg-white 
              text-black 
              border-4 ${styles.border}
              shadow-2xl hover:shadow-3xl
              transition-all duration-150
              active:scale-95
              rounded-2xl
              touch-manipulation
            `}
            aria-label="Previous podcast"
          >
            <ChevronLeft className="w-12 h-12 md:w-16 md:h-16 mr-2" />
            LEFT
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className={`
              h-32 md:h-40 text-2xl md:text-3xl font-black 
              bg-white/90 hover:bg-white 
              text-black 
              border-4 ${styles.border}
              shadow-2xl hover:shadow-3xl
              transition-all duration-150
              active:scale-95
              rounded-2xl
              touch-manipulation
            `}
            aria-label="Next podcast"
          >
            RIGHT
            <ChevronRight className="w-12 h-12 md:w-16 md:h-16 ml-2" />
          </Button>
        </div>

        {/* Minimal Footer */}
        <div className="text-center">
          <div className={`${styles.text} text-xs font-bold tracking-[0.4em] uppercase opacity-60`}>
            {podcasts.length} • Available • Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;