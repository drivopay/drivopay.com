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
    const contact = await razorpay.contacts.create({
      name,
      type: 'vendor',
      reference_id: `contact_${Date.now()}`,
    });

    // Step 2: Create fund account
    const fundAccount = await razorpay.fundAccounts.create({
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

    const payout = await razorpay.payouts.create(payoutOptions);

    return NextResponse.json({
      success: true,
      payoutId: payout.id,
      status: payout.status,
      utr: payout.utr, // Unique Transaction Reference
      fundAccountId: fundAccount.id,
    });
  } catch (error: any) {
    console.error('Payout creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.error?.description || error.message || 'Failed to create payout',
      },
      { status: 500 }
    );
  }
}
