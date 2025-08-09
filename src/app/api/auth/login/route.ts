import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse('Email and password are required', { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    const tokenPayload = { id: user._id, email: user.email, fullName: user.fullName };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({ message: 'Login successful', user: tokenPayload });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('LOGIN_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}