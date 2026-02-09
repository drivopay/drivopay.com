import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      accountNumber,
      ifsc,
      name,
      mode = 'IMPS',
      purpose = 'payout',
      narration,
    } = await request.json();

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!accountNumber || !ifsc || !name) {
      return NextResponse.json(
        { success: false, error: 'Missing required bank details' },
        { status: 400 }
      );
    }

    // Step 1: Create contact
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contact = await (razorpay as any).contacts.create({
      name,
      type: 'vendor',
      reference_id: `contact_${Date.now()}`,
    });

    // Step 2: Create fund account
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fundAccount = await (razorpay as any).fundAccounts.create({
      contact_id: contact.id,
      account_type: 'bank_account',
      bank_account: {
        name,
        ifsc,
        account_number: accountNumber,
      },
    });

    // Step 3: Create payout
    const payoutOptions = {
      account_number: process.env.RAZORPAYX_ACCOUNT_NUMBER || '',
      fund_account_id: fundAccount.id,
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      mode: mode as 'IMPS' | 'NEFT' | 'RTGS' | 'UPI',
      purpose,
      queue_if_low_balance: true,
      reference_id: `payout_${Date.now()}`,
      narration: narration || 'Withdrawal from DrivoPay',
      notes: {
        created_at: new Date().toISOString(),
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payout = await (razorpay as any).payouts.create(payoutOptions);

    return NextResponse.json({
      success: true,
      payoutId: payout.id,
      status: payout.status,
      utr: payout.utr, // Unique Transaction Reference
      fundAccountId: fundAccount.id,
    });
  } catch (error: unknown) {
    console.error('Payout creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payout';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
