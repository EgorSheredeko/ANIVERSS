// src/app/api/auth/register/route.js
import { supabase } from '../../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Проверяем, есть ли уже пользователь с этим email
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставляем нового пользователя
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword, avatar: '/avatar.jpg' }]);

    if (error) throw error;

    // Возвращаем данные пользователя
    return NextResponse.json({ username, email, avatar: '/avatar.jpg' });
  } catch (err) {
    console.error('Register error:', err); // Логирование ошибки в терминал
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
