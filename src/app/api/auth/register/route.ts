import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    if (password.length < 6) {
      return new NextResponse('Password must be at least 6 characters', { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse('User with this email already exists', { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({ fullName, email, passwordHash });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error('REGISTRATION_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}