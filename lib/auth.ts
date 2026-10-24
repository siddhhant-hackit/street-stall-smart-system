import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function requireUser() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return user;
}
