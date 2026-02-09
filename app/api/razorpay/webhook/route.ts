import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Signature verified, process the webhook
    const payload = JSON.parse(body);
    const event = payload.event;

    // TODO: Check if event ID was already processed (idempotency)
    // Store eventId in database to prevent duplicate processing

    // Handle different events
    switch (event) {
      case 'payment.captured':
        console.log('Payment captured:', payload.payload.payment.entity);
        // TODO: Update your database, credit user wallet, send notification
        break;

      case 'payment.failed':
        console.log('Payment failed:', payload.payload.payment.entity);
        // TODO: Handle failed payment, notify user
        break;

      case 'qr_code.credited':
        console.log('QR code payment received:', payload.payload.qr_code.entity);
        // TODO: Update database, credit driver wallet, send notification
        // payload.payload.qr_code.entity.payment_id - use this to credit wallet
        // payload.payload.qr_code.entity.amount - amount in paise
        break;

      case 'qr_code.closed':
        console.log('QR code closed:', payload.payload.qr_code.entity);
        break;

      case 'payout.processed':
        console.log('Payout processed:', payload.payload.payout.entity);
        // TODO: Update payout status in database
        break;

      case 'payout.failed':
        console.log('Payout failed:', payload.payload.payout.entity);
        // TODO: Handle failed payout, refund user wallet, notify
        break;

      case 'payout.reversed':
        console.log('Payout reversed:', payload.payload.payout.entity);
        // TODO: Handle payout reversal, refund user wallet
        break;

      default:
        console.log('Unhandled event:', event);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
