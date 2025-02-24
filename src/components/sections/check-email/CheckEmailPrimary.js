'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function CheckEmail() {
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const COOLDOWN_TIME = 45; // 45 seconds

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    setIsLoading(true);
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(COOLDOWN_TIME);
    }, 1000);
  };

  const progress = ((COOLDOWN_TIME - countdown) / COOLDOWN_TIME) * 100;
  const isDisabled = countdown > 0 || isLoading;

  return (
    <div className="ltn__login-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="account-login-inner section-bg-1">
              <div className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-mt-56">
                <div className="tw-w-full tw-max-w-md">
                  <CardHeader className="tw-space-y-4">
                    <div className="tw-flex tw-justify-center">
                      <div className="tw-bg-primary/10 tw-p-4 tw-rounded-full">
                        <Mail className="tw-w-8 tw-h-8 tw-text-primary tw-animate-bounce" />
                      </div>
                    </div>
                    <div className="tw-space-y-2 tw-text-center">
                      <CardTitle className="tw-text-2xl tw-font-bold">Check your email</CardTitle>
                      <CardDescription className="tw-text-gray-500">
                        We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="tw-space-y-4">
                    <div className="tw-bg-secondary/50 tw-rounded-lg tw-p-4">
                      <p className="tw-text-sm tw-text-center tw-text-muted-foreground">
                        Didn&apos;t receive the email? Check your spam folder or request a new verification link.
                      </p>
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-relative">
                        <Button
                          variant=""
                          className={`!tw-bg-yellow-500 tw-w-full !tw-group tw-relative tw-overflow-hidden disabled:tw-cursor-not-allowed`}
                          onClick={handleResendEmail}
                          disabled={isDisabled}
                        >
                          {countdown > 0 && (
                            <div
                              className="tw-absolute tw-inset-0 tw-bg-primary/10 tw-transition-transform tw-duration-500 tw-ease-linear"
                              style={{
                                transform: `translateX(${100 - progress}%)`,
                              }}
                            />
                          )}
                          <div className="tw-relative tw-z-10 tw-flex tw-items-center tw-justify-center">
                            <RefreshCw className={`tw-mr-4 tw-h-4 tw-w-4 ${isLoading ? '!tw-animate-spin' : '!tw-group-hover:animate-spin'}`} />
                            {isDisabled
                              ? `Resend available in ${countdown}s`
                              : 'Resend verification email'
                            }
                          </div>
                        </Button>
                      </div>
                      <Link href="/login" className="tw-w-full">
                        <button className="theme-btn-3 btn reverse-color btn-block !tw-flex !tw-items-center !tw-justify-center tw-w-full">
                          Back to login
                          <ArrowRight className="tw-ml-2 tw-h-4 tw-w-4" />
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}