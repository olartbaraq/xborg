'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/providers';
import { authApi } from '@/lib/api';
import { Spinner } from '@/components/ui';
import { CheckCircle } from 'lucide-react';

export default function AuthSuccessPage() {
  const router = useRouter();
  const { setUser, refreshAuth } = useAuthContext();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Fetch user data from the secure /auth/me endpoint
        // The HTTP-only cookies are automatically sent with the request
        const user = await authApi.getCurrentUser();

        if (user) {
          setUser(user);
          setStatus('success');

          // Redirect to profile after short delay
          setTimeout(() => {
            router.push('/profile');
          }, 1500);
        } else {
          throw new Error('Failed to get user data');
        }
      } catch (error) {
        console.error('Auth success handling error:', error);

        // Try refreshing auth state as fallback
        try {
          await refreshAuth();
          setStatus('success');
          setTimeout(() => {
            router.push('/profile');
          }, 1500);
        } catch {
          setStatus('error');
          setErrorMessage('Authentication failed. Please try again.');
          setTimeout(() => {
            router.push('/signin');
          }, 3000);
        }
      }
    };

    handleAuthSuccess();
  }, [router, setUser, refreshAuth]);

  return (
    <div className="min-h-screen bg-borg-dark flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-borg-green/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" />
            <h1 className="text-2xl font-semibold text-white">
              Completing sign in...
            </h1>
            <p className="text-borg-gray">
              Please wait while we set up your session
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-borg-green/20 flex items-center justify-center glow-green">
              <CheckCircle className="h-10 w-10 text-borg-green" />
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Successfully signed in!
            </h1>
            <p className="text-borg-gray">Redirecting to your profile...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Authentication Failed
            </h1>
            <p className="text-borg-gray max-w-md">
              {errorMessage || 'Something went wrong. Redirecting to sign in...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
