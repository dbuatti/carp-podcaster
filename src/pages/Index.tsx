"use client";

import React, { useState, useEffect } from 'react';
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
}

const categoryStyles: Record<string, CategoryStyle> = {
  "🧘 Voice, Body & Somatics": {
    bg: "from-emerald-50 via-teal-50 to-emerald-100",
    text: "text-emerald-800",
    accent: "bg-emerald-500",
    accentText: "text-white",
    button: "bg-emerald-600",
    buttonHover: "bg-emerald-700",
    glow: "shadow-[0_0_50px_rgba(16,185,129,0.4)]",
    ring: "ring-emerald-500/30"
  },
  "☸️ Consciousness & Meaning-Making": {
    bg: "from-purple-50 via-pink-50 to-purple-100",
    text: "text-purple-800",
    accent: "bg-purple-500",
    accentText: "text-white",
    button: "bg-purple-600",
    buttonHover: "bg-purple-700",
    glow: "shadow-[0_0_50px_rgba(168,85,247,0.4)]",
    ring: "ring-purple-500/30"
  },
  "🎨 Creative Process & Artistic Identity": {
    bg: "from-orange-50 via-amber-50 to-orange-100",
    text: "text-orange-800",
    accent: "bg-orange-500",
    accentText: "text-white",
    button: "bg-orange-600",
    buttonHover: "bg-orange-700",
    glow: "shadow-[0_0_50px_rgba(249,115,22,0.4)]",
    ring: "ring-orange-500/30"
  },
  "⚖️ Systems, Ethics & Thinking Clearly": {
    bg: "from-blue-50 via-cyan-50 to-blue-100",
    text: "text-blue-800",
    accent: "bg-blue-500",
    accentText: "text-white",
    button: "bg-blue-600",
    buttonHover: "bg-blue-700",
    glow: "shadow-[0_0_50px_rgba(59,130,246,0.4)]",
    ring: "ring-blue-500/30"
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
    <div className={`min-h-screen bg-gradient-to-br ${styles.bg} p-4 md:p-8 lg:p-12 flex items-center justify-center overflow-hidden relative`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-3xl w-full mx-auto space-y-8 relative z-10">
        
        {/* Header with icon */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Podcast className="w-8 h-8 text-gray-800" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight drop-shadow-lg">
              Drive Safe
            </h1>
          </div>
          <p className="text-gray-700 text-base md:text-lg font-medium tracking-wide">
            LONG DRIVES MADE BETTER
          </p>
        </div>

        {/* Category Badge with icon */}
        <div className="text-center">
          <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold ${styles.accent} ${styles.accentText} shadow-lg transform transition-all hover:scale-105`}>
            <span className="text-lg">{currentPodcast.category.split(' ')[0]}</span>
            <span>{currentPodcast.category.substring(2)}</span>
          </span>
        </div>

        {/* Podcast Card with premium styling */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 min-h-[320px] flex flex-col justify-center border border-white/60 relative overflow-hidden">
          {/* Decorative corner accents */}
          <div className={`absolute top-0 left-0 w-24 h-24 ${styles.accent} opacity-20 rounded-br-3xl`}></div>
          <div className={`absolute bottom-0 right-0 w-24 h-24 ${styles.accent} opacity-20 rounded-tl-3xl`}></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
              {currentPodcast.title}
            </h2>
            <p className="text-gray-700 text-xl md:text-2xl mb-4 leading-relaxed font-semibold">
              {currentPodcast.description}
            </p>
            {currentPodcast.searchTerms && (
              <div className="inline-block px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 mt-2 border border-gray-200">
                Search: "{currentPodcast.searchTerms}"
              </div>
            )}
            <div className={`text-sm mt-6 font-bold ${styles.text} opacity-75 flex items-center gap-2`}>
              <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {currentIndex + 1} of {podcasts.length}
            </div>
          </div>
        </div>

        {/* Circular Play Button with pulse effect */}
        <div className="flex justify-center py-6">
          <button
            onClick={handlePlay}
            className={`
              w-40 h-40 rounded-full 
              ${styles.button} 
              hover:${styles.buttonHover} 
              text-white 
              ${styles.glow}
              transform transition-all duration-300
              ${isPlaying ? 'scale-95' : 'hover:scale-105'}
              flex items-center justify-center
              relative overflow-hidden
              ring-4 ${styles.ring}
              hover:ring-8
            `}
            aria-label="Play podcast"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex flex-col items-center gap-3">
              <Play className="w-16 h-16 fill-current transition-transform duration-300" />
              <span className="text-sm font-black uppercase tracking-[0.3em]">PLAY</span>
            </div>
          </button>
        </div>

        {/* Navigation Buttons with premium styling */}
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={handlePrevious}
            size="lg"
            className={`
              h-24 text-2xl font-black 
              bg-white hover:bg-gray-50 
              text-gray-900 
              border-4 border-gray-200
              shadow-xl hover:shadow-2xl
              transition-all duration-200
              transform hover:-translate-y-1
              rounded-2xl
            `}
            aria-label="Previous podcast"
          >
            <ChevronLeft className="w-12 h-12 mr-2" />
            LEFT
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className={`
              h-24 text-2xl font-black 
              bg-white hover:bg-gray-50 
              text-gray-900 
              border-4 border-gray-200
              shadow-xl hover:shadow-2xl
              transition-all duration-200
              transform hover:-translate-y-1
              rounded-2xl
            `}
            aria-label="Next podcast"
          >
            RIGHT
            <ChevronRight className="w-12 h-12 ml-2" />
          </Button>
        </div>

        {/* Premium tips card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 text-sm text-gray-800 border border-white/70 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💡</span>
            <span className="font-bold text-gray-900 text-lg">Quick Tips</span>
          </div>
          <ul className="list-none space-y-2 text-gray-700 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Press the big circle to open in Apple Podcasts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Use LEFT/RIGHT buttons to browse while parked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Colors match categories for easy scanning</span>
            </li>
          </ul>
        </div>

        {/* Footer counter */}
        <div className="text-center text-gray-700 text-xs font-bold tracking-widest opacity-60 uppercase">
          {podcasts.length} • Podcasts • Available
        </div>
      </div>
    </div>
  );
};

export default Index;