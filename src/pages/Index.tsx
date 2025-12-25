"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { toast } from 'sonner';

interface Podcast {
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
  button: string;
  buttonHover: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  "🧘 Voice, Body & Somatics": {
    bg: "from-emerald-50 to-teal-50",
    text: "text-emerald-800",
    accent: "bg-emerald-100 text-emerald-800",
    button: "bg-emerald-600",
    buttonHover: "bg-emerald-700"
  },
  "☸️ Consciousness & Meaning-Making": {
    bg: "from-purple-50 to-pink-50",
    text: "text-purple-800",
    accent: "bg-purple-100 text-purple-800",
    button: "bg-purple-600",
    buttonHover: "bg-purple-700"
  },
  "🎨 Creative Process & Artistic Identity": {
    bg: "from-orange-50 to-amber-50",
    text: "text-orange-800",
    accent: "bg-orange-100 text-orange-800",
    button: "bg-orange-600",
    buttonHover: "bg-orange-700"
  },
  "⚖️ Systems, Ethics & Thinking Clearly": {
    bg: "from-blue-50 to-cyan-50",
    text: "text-blue-800",
    accent: "bg-blue-100 text-blue-800",
    button: "bg-blue-600",
    buttonHover: "bg-blue-700"
  }
};

const podcasts: Podcast[] = [
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

  const handlePlay = () => {
    const podcast = podcasts[currentIndex];
    if (podcast.appleLink) {
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
    <div className={`min-h-screen bg-gradient-to-br ${styles.bg} p-4 flex items-center justify-center`}>
      <div className="max-w-3xl w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Drive Safe Podcasts
          </h1>
          <p className="text-gray-600 text-sm">
            Long drives made better
          </p>
        </div>

        {/* Category Badge */}
        <div className="text-center">
          <span className={`inline-block px-5 py-2.5 rounded-full text-sm font-semibold ${styles.accent}`}>
            {currentPodcast.category}
          </span>
        </div>

        {/* Podcast Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[320px] flex flex-col justify-center border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {currentPodcast.title}
          </h2>
          <p className="text-gray-700 text-xl mb-3 leading-relaxed">
            {currentPodcast.description}
          </p>
          {currentPodcast.searchTerms && (
            <p className="text-gray-500 text-sm italic mt-2">
              Search: "{currentPodcast.searchTerms}"
            </p>
          )}
          <div className={`text-sm mt-6 ${styles.text} opacity-70`}>
            {currentIndex + 1} of {podcasts.length}
          </div>
        </div>

        {/* Circular Play Button */}
        <div className="flex justify-center py-4">
          <button
            onClick={handlePlay}
            className={`w-32 h-32 rounded-full ${styles.button} hover:${styles.buttonHover} text-white shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group`}
            aria-label="Play podcast"
          >
            <div className="flex flex-col items-center gap-1">
              <Play className="w-12 h-12 fill-current group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Play</span>
            </div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handlePrevious}
            size="lg"
            className="h-16 text-lg font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-200 shadow-md"
            aria-label="Previous podcast"
          >
            <ChevronLeft className="w-8 h-8 mr-2" />
            LEFT
          </Button>

          <Button
            onClick={handleNext}
            size="lg"
            className="h-16 text-lg font-bold bg-white hover:bg-gray-100 text-gray-800 border-2 border-gray-200 shadow-md"
            aria-label="Next podcast"
          >
            RIGHT
            <ChevronRight className="w-8 h-8 ml-2" />
          </Button>
        </div>

        {/* Quick Tips */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-sm text-gray-700 border border-gray-200">
          <p className="font-semibold mb-2 text-gray-900">💡 Quick Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Press the big circle to open in Apple Podcasts</li>
            <li>Use LEFT/RIGHT buttons to browse while parked</li>
            <li>Colors match podcast categories for easy scanning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;