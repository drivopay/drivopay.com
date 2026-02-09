"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Smartphone, Check } from 'lucide-react';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const { signIn, signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleSendOTP = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setOtpSent(true);
    setError('');
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate OTP verification (in real app, verify with backend)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, accept any 6-digit OTP
    if (formData.otp.length === 6) {
      setOtpVerified(true);

      // Auto sign in with phone number
      const demoUser = {
        name: formData.name || formData.phone,
        email: `${formData.phone}@drivopay.com`,
        phone: formData.phone
      };

      // Use existing signUp to create user
      await signUp(demoUser.name, demoUser.email, formData.phone, 'mobile-otp');

      setIsLoading(false);
      onOpenChange(false);
      setFormData({ name: '', email: '', phone: '', password: '', otp: '' });
      setOtpSent(false);
      setOtpVerified(false);

      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      setError('Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.phone) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }
        await signUp(formData.name, formData.email, formData.phone, formData.password);
      }
      onOpenChange(false);
      setFormData({ name: '', email: '', phone: '', password: '', otp: '' });

      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setFormData({ name: '', email: '', phone: '', password: '', otp: '' });
    setOtpSent(false);
    setOtpVerified(false);
  };

  const switchLoginMethod = (method: 'email' | 'mobile') => {
    setLoginMethod(method);
    setError('');
    setFormData({ name: '', email: '', phone: '', password: '', otp: '' });
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'signin' ? 'Welcome back' : 'Create account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin'
              ? 'Sign in to your DrivoPay account'
              : 'Start earning instantly with DrivoPay'}
          </DialogDescription>
        </DialogHeader>

        {/* Login Method Toggle */}
        {mode === 'signin' && (
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => switchLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => switchLoginMethod('mobile')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-all ${
                loginMethod === 'mobile'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile OTP
            </button>
          </div>
        )}

        {/* Email/Password Login Form */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailPasswordSubmit} className="space-y-4 mt-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="driver@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Sign Up'
              )}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={switchMode}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                {mode === 'signin'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        )}

        {/* Mobile OTP Login Form */}
        {loginMethod === 'mobile' && mode === 'signin' && (
          <div className="space-y-4 mt-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="mobile-name">Full Name</Label>
                <Input
                  id="mobile-name"
                  placeholder="Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mobile-phone">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="mobile-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={otpSent}
                  required
                />
                {!otpSent && (
                  <Button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                )}
              </div>
            </div>

            {otpSent && !otpVerified && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                    className="text-center text-2xl tracking-widest"
                    required
                  />
                  <p className="text-sm text-gray-500 text-center">
                    OTP sent to {formData.phone}
                  </p>
                </div>

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={isLoading || formData.otp.length !== 6}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Verify OTP
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setFormData({ ...formData, otp: '' });
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            {error && !otpSent && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {!otpSent && (
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {mode === 'signin'
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Demo Mode:</strong> Enter any phone number and any 6-digit OTP to sign in.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
