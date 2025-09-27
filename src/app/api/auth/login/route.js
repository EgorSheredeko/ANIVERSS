import { supabase } from '../../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  return NextResponse.json({ username: user.username, email: user.email, avatar: user.avatar || '/avatar.jpg' });
}
