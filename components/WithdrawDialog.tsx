"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, Building, AlertCircle } from 'lucide-react';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
}

export function WithdrawDialog({ open, onOpenChange, availableBalance }: WithdrawDialogProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async () => {
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (withdrawAmount > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setSuccess(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      setAmount('');
      onOpenChange(false);
    }, 2000);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Withdraw Money</DialogTitle>
              <DialogDescription>
                Transfer money from your DrivoPay wallet to your bank account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Available Balance */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-700 mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-emerald-900">₹{availableBalance.toLocaleString()}</p>
              </div>

              {/* Amount Input */}
              <div>
                <Label htmlFor="amount">Withdrawal Amount</Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 text-lg h-14"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Quick amounts</p>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 px-3 border-2 border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold text-gray-700 hover:text-emerald-700"
                    >
                      ₹{quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Account */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">HDFC Bank</p>
                    <p className="text-sm text-gray-600">Account ****4567</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              {/* Withdraw Button */}
              <Button
                onClick={handleWithdraw}
                disabled={isLoading || !amount}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-14 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Withdraw Money'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Withdrawals are usually processed within 24 hours
              </p>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h3>
            <p className="text-gray-600 mb-4">
              ₹{parseFloat(amount).toLocaleString()} has been sent to your bank account
            </p>
            <p className="text-sm text-gray-500">
              Money will be credited to your account instantly
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
