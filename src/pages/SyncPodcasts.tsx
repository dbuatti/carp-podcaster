"use client";

import React, { useState } from 'react';
import { Upload, Download, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { syncPodcastsToSupabase, fetchPodcastsFromSupabase, PodcastType } from '@/integrations/supabase/podcast-sync';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const localPodcasts: PodcastType[] = [
  { id: 1, title: "Interpretation vs Inhabitation", description: "This Is A Voice - Discussion around 30:30 mark", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/this-is-a-voice/id1522020103", searchTerms: "Interpretation versus Inhabitation" },
  { id: 2, title: "Healing After Trauma with Dr. Peter Levine", description: "Being Well with Forrest Hanson and Dr. Rick Hanson", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/healing-after-trauma-with-dr-peter-levine/id1120885936?i=1000653898932" },
  { id: 3, title: "The Art of Receiving and Giving (Wheel of Consent)", description: "Sex Birth Trauma", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/the-art-of-receiving-and-giving-the-wheel/id1286485146?i=1000731393085" },
  { id: 4, title: "Is this Burnout? Polyvagal Theory", description: "This Is A Voice - Check main feed", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/this-is-a-voice/id1522020103", searchTerms: "Burnout Polyvagal Performing Arts" },
  { id: 5, title: "How to Breathe Correctly", description: "Huberman Lab - Optimal Health & Mood", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/how-to-breathe-correctly-for-optimal-health-mood-learning/id1545953110?i=1000600532657" },
  { id: 6, title: "Polyvagal Theory with Dr. Stephen Porges", description: "Being Well with Forrest Hanson and Dr. Rick Hanson", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-with-dr-stephen-porges/id1120885936?i=1000485497017" },
  { id: 7, title: "Dr. Jack Feldman: Breathing for Performance", description: "Huberman Lab", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/dr-jack-feldman-breathing-for-mental-physical-health/id1545953110?i=1000547400245" },
  { id: 8, title: "The Wheel of Consent with Dr. Betty Martin", description: "Sex Birth Trauma", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/the-art-of-receiving-and-giving-the-wheel/id1286485146?i=1000731393085" },
  { id: 28, title: "How to Regulate Your Nervous System For Stress, Anxiety, And Trauma with Peter Levine", description: "10% Happier with Dan Harris", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/how-to-regulate-your-nervous-system-for-stress-anxiety/id1087147821?i=1000653595094" },
  { id: 29, title: "The Wheel of Consent Revolution with Dr. Betty Martin", description: "The Erotic Philosopher", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/the-wheel-of-consent-revolution-with-dr-betty-martin/id1525741635?i=1000571567907" },
  { id: 30, title: "Dr. Jack Feldman: Breathing for Mental & Physical Health & Performance", description: "Huberman Lab", category: "🧘 Voice, Body & Somatics", appleLink: "https://podcasts.apple.com/us/podcast/dr-jack-feldman-breathing-for-mental-physical-health/id1545953110?i=1000547400245" },
  { id: 9, title: "Nick Cave: Loss, Yearning, Transcendence", description: "On Being with Krista Tippett - Search in feed", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/on-being-with-krista-tippett/id15125565?i=1000473456789", searchTerms: "Nick Cave On Being" },
  { id: 10, title: "How to Get Out of Your Head", description: "10% Happier - Joseph Goldstein & Sam Harris", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821", searchTerms: "Joseph Goldstein Sam Harris" },
  { id: 11, title: "Marie Howe: The Language of the Body", description: "Poetry Unbound", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/poetry-unbound/id1492928827", searchTerms: "Marie Howe" },
  { id: 12, title: "Sebene Selassie: Non-Attached", description: "10% Happier with Dan Harris", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821", searchTerms: "Sebene Selassie" },
  { id: 13, title: "The Art of Not Clinging", description: "Wisdom of the Sages - Search in feed", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/wisdom-of-the-sages/id15125565", searchTerms: "Art of Not Clinging" },
  { id: 14, title: "Joseph Goldstein: How Not to Try Too Hard", description: "10% Happier", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/joseph-goldstein-on-how-not-to-try-too-hard-in-meditation/id1087147821?i=1000612420520" },
  { id: 15, title: "Joseph Goldstein: Impermanence", description: "10% Happier", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/joseph-goldstein-on-impermanence-impersonality-and/id1087147821?i=1000683225660" },
  { id: 31, title: "Three Strategies for Getting Over Yourself with Joseph Goldstein", description: "10% Happier with Dan Harris", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/three-strategies-for-getting-over-yourself-joseph-goldstein/id1087147821?i=1000731139217" },
  { id: 32, title: "Meditation Party with Sebene Selassie and Jeff Warren", description: "10% Happier with Dan Harris", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/meditation-party-with-sebene-selassie-and-jeff/id1087147821?i=1000613124232" },
  { id: 33, title: "How To Handle Literally Anything with Sebene Selassie", description: "10% Happier with Dan Harris", category: "☸️ Consciousness & Meaning-Making", appleLink: "https://podcasts.apple.com/us/podcast/how-to-handle-literally-anything-sebene-selassie-and/id1087147821?i=1000652526353" },
  { id: 16, title: "Rick Rubin: The Creative Act", description: "Design Matters with Debbie Millman", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin/id328074695?i=1000603914256" },
  { id: 17, title: "Rick Rubin: Modern Master", description: "The Rich Roll Podcast", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-modern-master-of-the-creative-act/id582272991?i=1000594651321" },
  { id: 18, title: "Rick Rubin: Allowing vs Willing", description: "The Daily Stoic", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-on-the-creative-act/id1430315931?i=1000600932644" },
  { id: 19, title: "Rick Rubin: Protocols for Creative Energy", description: "Huberman Lab", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-protocols-to-access-creative-energy-and-process/id1545953110?i=1000639648788" },
  { id: 20, title: "Company with Elizabeth Day", description: "Sentimental Garbage - Sondheim analysis", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/sentimental-garbage/id1372827605", searchTerms: "Elizabeth Day Sondheim" },
  { id: 34, title: "Rick Rubin on How to Make Something Great", description: "People I (Mostly) Admire", category: "🎨 Creative Process & Artistic Identity", appleLink: "https://podcasts.apple.com/us/podcast/rick-rubin-on-how-to-make-something-great-update/id1525936566?i=1000723160112" },
  { id: 21, title: "Jocelyn K. Glei: Tyranny of Urgency", description: "Hurry Slowly", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/hurry-slowly/id1272852250", searchTerms: "Tyranny of Urgency" },
  { id: 22, title: "Rethinking Your Identity", description: "Re:Thinking with Adam Grant", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/rethinking-with-adam-grant/id1528594034", searchTerms: "Rethinking Identity" },
  { id: 23, title: "Jon Ronson on Shame and Power", description: "Conversations (ABC Australia)", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/conversations/id94688506", searchTerms: "Jon Ronson Shame Power" },
  { id: 24, title: "Why You're Always Half-Stressed", description: "10% Happier - Yellow Mode", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/10-happier-with-dan-harris/id1087147821", searchTerms: "Half Stressed Yellow Mode" },
  { id: 25, title: "Kristina Casale: Power of Community Singing", description: "The Vocal Lab Collective", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/the-vocal-lab-collective/id1536083499", searchTerms: "Kristina Casale Community Singing" },
  { id: 26, title: "Deb Dana: Polyvagal Theory", description: "Therapist Uncensored", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/therapist-uncensored/id1286485146", searchTerms: "Deb Dana Polyvagal" },
  { id: 27, title: "Polyvagal Theory and Trauma", description: "Transforming Trauma", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/transforming-trauma/id1496190024", searchTerms: "Polyvagal Theory Trauma" },
  { id: 35, title: "How to Use Polyvagal Theory to Shift Your Nervous System with Deb Dana", description: "Your Life In Process", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/how-to-use-polyvagal-theory-to-shift-your-nervous-system/id1596820706?i=1000579913098" },
  { id: 36, title: "Introduction to Polyvagal Theory with Deb Dana", description: "the tara bixby podcast", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/141-deb-dana-introduction-to-polyvagal-theory/id1506417679?i=1000602246434" },
  { id: 37, title: "Polyvagal Theory and the Nervous System with Deb Dana", description: "The Third Place", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-and-the-nervous-system-with-deb-dana-ep-76/id1511577455?i=1000550675113" },
  { id: 38, title: "Polyvagal Theory for Trauma with Arielle Schwartz", description: "Evidence-Based Podcast", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/polyvagal-theory-for-trauma-with-arielle-schwartz-phd/id1619983266?i=1000709131944" },
  { id: 39, title: "Finding Glimmers: A Polyvagal Approach with Deb Dana & Courtney Rolfe", description: "Therapy Chat", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/438-finding-glimmers-a-polyvagal-approach-with-deb/id1031099411?i=1000661233274" },
  { id: 40, title: "Peter Levine: Somatic Experiencing", description: "Grief is a Sneaky Bitch", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/peter-levine-somatic-experiencing/id1474558908?i=1000649700454" },
  { id: 41, title: "The Many Sides of Trauma with Peter Levine", description: "ManTalks Podcast", category: "⚖️ Systems, Ethics & Thinking Clearly", appleLink: "https://podcasts.apple.com/us/podcast/peter-levine-the-many-sides-of-trauma/id1015078747?i=1000658438132" },
];

const SyncPodcasts = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [fetchedCount, setFetchedCount] = useState(0);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    
    const result = await syncPodcastsToSupabase(localPodcasts);
    setSyncResult(result);
    setIsSyncing(false);
    
    if (result.success) {
      toast.success(`Successfully synced ${result.count} podcasts to Supabase`);
    } else {
      toast.error('Failed to sync podcasts');
    }
  };

  const handleFetch = async () => {
    setIsFetching(true);
    try {
      const podcasts = await fetchPodcastsFromSupabase();
      setFetchedCount(podcasts.length);
      toast.success(`Fetched ${podcasts.length} podcasts from Supabase`);
    } catch (error) {
      toast.error('Failed to fetch podcasts');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcast Database Sync</h1>
        <p className="text-gray-600">Manage your podcast collection in Supabase</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload to Supabase
            </CardTitle>
            <CardDescription>
              Sync all {localPodcasts.length} local podcasts to your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSync} 
              disabled={isSyncing}
              className="w-full"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Sync Podcasts
                </>
              )}
            </Button>
            
            {syncResult && (
              <div className="mt-4 p-3 rounded-lg bg-gray-50">
                {syncResult.success ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Success! {syncResult.count} podcasts synced</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Sync failed</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Fetch from Supabase
            </CardTitle>
            <CardDescription>
              Retrieve podcasts from your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleFetch} 
              disabled={isFetching}
              className="w-full"
              variant="secondary"
            >
              {isFetching ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Fetch Podcasts
                </>
              )}
            </Button>
            
            {fetchedCount > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Fetched {fetchedCount} podcasts</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Schema</CardTitle>
          <CardDescription>
            Required table structure for Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre>{`CREATE TABLE podcasts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  appleLink TEXT,
  searchTerms TEXT
);`}</pre>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Run this SQL in your Supabase dashboard to create the table.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SyncPodcasts;