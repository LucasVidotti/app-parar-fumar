import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          location: string | null;
          about: string | null;
          visibility: 'public' | 'friends' | 'private';
          quit_date: string;
          cigarettes_per_day: number;
          price_per_pack: number;
          cigarettes_per_pack: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      diary_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: number;
          craving_level: number;
          triggers: string[];
          notes: string | null;
          victories: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['diary_entries']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['diary_entries']['Insert']>;
      };
      community_posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          likes: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['community_posts']['Row'], 'id' | 'likes' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['community_posts']['Insert']>;
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['friendships']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['friendships']['Insert']>;
      };
    };
  };
};
