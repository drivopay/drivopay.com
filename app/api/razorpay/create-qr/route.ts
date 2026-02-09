import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, name, description, customerId } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const qrOptions = {
      type: 'upi_qr' as const,
      name: name || 'Payment QR',
      usage: 'single_use' as const, // Single use for each transaction
      fixed_amount: true,
      payment_amount: Math.round(amount * 100), // Convert to paise
      description: description || 'Scan to pay',
      customer_id: customerId, // Optional
      close_by: Math.floor(Date.now() / 1000) + 3600, // Auto-close after 1 hour
      notes: {
        purpose: 'QR Code Payment',
        created_at: new Date().toISOString(),
      },
    };

    const qrCode = await razorpay.qrCode.create(qrOptions) as {
      id: string;
      image_url: string;
      short_url?: string;
      qr_string?: string;
    };

    return NextResponse.json({
      success: true,
      qrCodeId: qrCode.id,
      imageUrl: qrCode.image_url,
      shortUrl: qrCode.short_url || '',
      qrString: qrCode.qr_string || '', // UPI payment string
    });
  } catch (error: unknown) {
    console.error('QR Code creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create QR code';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
