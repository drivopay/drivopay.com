"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import {
  QrCode, Copy, Share2, CheckCircle, ArrowDownToLine,
  Smartphone, CreditCard, Wallet, Bell, Loader2
} from 'lucide-react';
import Image from 'next/image';

interface ReceivePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReceivePaymentDialog({ open, onOpenChange }: ReceivePaymentDialogProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false);
  const [qrData, setQrData] = useState<any>(null);
  const [loadingQR, setLoadingQR] = useState(false);
  const [qrError, setQrError] = useState('');

  // Generate UPI ID from user's phone
  const upiId = user?.phone
    ? `${user.phone.replace(/\s/g, '').replace('+91', '')}@drivopay`
    : 'driver@drivopay';

  const quickAmounts = [100, 200, 500, 1000];

  // Generate Razorpay QR code when amount is set
  useEffect(() => {
    if (open && amount && parseFloat(amount) > 0) {
      generateQRCode();
    }
  }, [amount, open]);

  const generateQRCode = async () => {
    setLoadingQR(true);
    setQrError('');
    try {
      const response = await fetch('/api/razorpay/create-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          name: user?.name || 'DrivoPay Driver',
          description: 'Payment for service',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setQrData(data);
      } else {
        setQrError(data.error || 'Failed to generate QR code');
      }
    } catch (error: any) {
      console.error('QR generation error:', error);
      setQrError('Failed to generate QR code. Please try again.');
    } finally {
      setLoadingQR(false);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    let message = amount
      ? `Pay ₹${amount} to ${user?.name}\nUPI ID: ${upiId}`
      : `Pay to ${user?.name}\nUPI ID: ${upiId}`;

    // Add Razorpay payment link if available
    if (qrData?.shortUrl) {
      message += `\n\nQuick Pay Link: ${qrData.shortUrl}`;
    }

    if (navigator.share) {
      navigator.share({
        title: 'Receive Payment - DrivoPay',
        text: message,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(message);
      alert('Payment details copied to clipboard!');
    }
  };

  // Simulate payment received (for demo)
  const simulatePayment = () => {
    setPaymentReceived(true);
    setTimeout(() => {
      setPaymentReceived(false);
      onOpenChange(false);
      setAmount('');
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ArrowDownToLine className="w-6 h-6 text-emerald-600" />
            Receive Payment
          </DialogTitle>
          <DialogDescription>
            Share your QR code or UPI ID with customers to receive instant payments
          </DialogDescription>
        </DialogHeader>

        {!paymentReceived ? (
          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-base font-semibold">
                Enter Amount (Optional)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                  ₹
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-2xl font-bold h-14 text-center"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    onClick={() => setAmount(amt.toString())}
                    className="hover:bg-emerald-50 hover:border-emerald-600 hover:text-emerald-600"
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
            </div>

            {/* QR Code Display */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
              <div className="bg-white rounded-xl p-6 mb-4">
                {/* Real Razorpay QR Code */}
                {!amount || parseFloat(amount) <= 0 ? (
                  <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Enter amount to generate QR code</p>
                    </div>
                  </div>
                ) : loadingQR ? (
                  <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4">
                    <div className="text-center">
                      <Loader2 className="w-16 h-16 mx-auto text-emerald-600 animate-spin mb-2" />
                      <p className="text-gray-600">Generating QR code...</p>
                    </div>
                  </div>
                ) : qrError ? (
                  <div className="w-full aspect-square bg-red-50 rounded-lg flex items-center justify-center p-4">
                    <div className="text-center">
                      <p className="text-red-600 mb-4">{qrError}</p>
                      <Button onClick={generateQRCode} className="bg-emerald-600 hover:bg-emerald-700">
                        Retry
                      </Button>
                    </div>
                  </div>
                ) : qrData?.imageUrl ? (
                  <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center p-4">
                    <Image
                      src={qrData.imageUrl}
                      alt="Payment QR Code"
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">QR code will appear here</p>
                    </div>
                  </div>
                )}

                {amount && parseFloat(amount) > 0 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                    <p className="text-3xl font-bold text-gray-900">₹{amount}</p>
                  </div>
                )}
              </div>

              <p className="text-center text-sm text-gray-600">
                <QrCode className="w-4 h-4 inline mr-1" />
                Scan with any UPI app to pay (PhonePe, Google Pay, Paytm, etc.)
              </p>

              {qrData && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 text-center">
                    ✓ Powered by Razorpay - Secure & Instant Payment
                  </p>
                </div>
              )}
            </div>

            {/* UPI ID Section */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Your UPI ID</Label>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <p className="font-mono text-sm font-medium text-gray-900">{upiId}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyUPI}
                  className="h-12 w-12"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-emerald-600 font-medium">Copied to clipboard!</p>
              )}
            </div>

            {/* Payment Methods Accepted */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Accepted Payment Methods
              </p>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-2 text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-medium text-gray-700">PhonePe</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-medium text-gray-700">Paytm</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-medium text-gray-700">Google Pay</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-1 text-orange-600" />
                  <p className="text-xs font-medium text-gray-700">All UPI</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleShare}
                className="h-12"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={simulatePayment}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 h-12"
              >
                <Bell className="w-4 h-4 mr-2" />
                Test Payment
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500">
              💡 Customer can pay by scanning QR code or entering your UPI ID
            </p>
          </div>
        ) : (
          // Payment Received Success
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Received!</h3>
            <p className="text-gray-600 mb-4">₹{amount || '500'} credited to your wallet</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>Transaction ID:</strong> TXN{Date.now().toString().slice(-8)}
              </p>
              <p className="text-sm text-green-800 mt-1">
                <strong>Time:</strong> {new Date().toLocaleTimeString('en-IN')}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Amount will be instantly available in your wallet
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
