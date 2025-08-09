import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface DecodedToken { id: string; }

export async function POST(request: Request) {
  try {
    await connectDB();
    const token = cookies().get('token')?.value;
    if (!token) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const { items: cartItems, shippingAddress } = await request.json();
    if (!cartItems || cartItems.length === 0 || !shippingAddress) {
      return new NextResponse('Missing order data', { status: 400 });
    }

    const orderItems = cartItems.map((item: { id: number; title: string; price: number; quantity: number; thumbnail: string; }) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      thumbnail: item.thumbnail,
    }));
    
    const totalAmount = orderItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    
    const newOrder = new Order({ user: userId, items: orderItems, totalAmount, shippingAddress, status: 'Pending' });
    
    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully', orderId: newOrder._id }, { status: 201 });

  } catch (error: any) {
    console.error('ORDER_CREATION_ERROR', error);
    if (error.name === 'ValidationError') {
      return new NextResponse(error._message, { status: 400 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const token = cookies().get('token')?.value;
    if (!token) {
      return new NextResponse('Authentication required', { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const userId = decoded.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json(orders);

  } catch (error) {
    console.error('GET_ORDERS_ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}