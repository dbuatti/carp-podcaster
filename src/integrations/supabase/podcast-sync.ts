import { supabase } from './client';

export interface PodcastType {
  id: number;
  title: string;
  description: string;
  category: string;
  appleLink: string;
  searchTerms?: string;
}

export const syncPodcastsToSupabase = async (podcasts: PodcastType[]) => {
  try {
    const { error: deleteError } = await supabase
      .from('podcasts')
      .delete()
      .neq('id', -1);

    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase
      .from('podcasts')
      .insert(podcasts);

    if (insertError) throw insertError;

    return { success: true, count: podcasts.length };
  } catch (error) {
    return { success: false, error };
  }
};

export const fetchPodcastsFromSupabase = async (): Promise<PodcastType[]> => {
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
};