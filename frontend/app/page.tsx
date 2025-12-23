"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks";
import { Button } from "@/components/ui";
import { Shield, Zap, Lock, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen bg-borg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-borg-green/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-borg-green-light/10 rounded-full blur-3xl animate-float-delayed" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 inline-flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-borg-green to-borg-green-light flex items-center justify-center glow-green">
                <span className="text-white font-bold text-2xl">X</span>
              </div>
              <span className="text-white font-bold text-3xl">XBorg</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Authentication
              <br />
              <span className="text-gradient">Made Simple</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-borg-gray max-w-2xl mx-auto mb-10">
              Experience seamless and secure authentication powered by Google
              OAuth. Your data is protected with enterprise-grade security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signin">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-borg-gray/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-borg-green rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
              Why Choose <span className="text-gradient">XBorg</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-borg-card border border-borg-border rounded-2xl p-8 hover:border-borg-green/30 transition-all duration-300 group">
                <div className="h-14 w-14 rounded-xl bg-borg-green/10 flex items-center justify-center mb-6 group-hover:bg-borg-green/20 transition-colors">
                  <Shield className="h-7 w-7 text-borg-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Secure by Design
                </h3>
                <p className="text-borg-gray">
                  Built with security-first principles. Your credentials are
                  never stored, leveraging Google&apos;s robust OAuth 2.0
                  infrastructure.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-borg-card border border-borg-border rounded-2xl p-8 hover:border-borg-green/30 transition-all duration-300 group">
                <div className="h-14 w-14 rounded-xl bg-borg-green/10 flex items-center justify-center mb-6 group-hover:bg-borg-green/20 transition-colors">
                  <Zap className="h-7 w-7 text-borg-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Lightning Fast
                </h3>
                <p className="text-borg-gray">
                  One-click authentication with Google. No forms to fill, no
                  passwords to remember. Get started in seconds.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-borg-card border border-borg-border rounded-2xl p-8 hover:border-borg-green/30 transition-all duration-300 group">
                <div className="h-14 w-14 rounded-xl bg-borg-green/10 flex items-center justify-center mb-6 group-hover:bg-borg-green/20 transition-colors">
                  <Lock className="h-7 w-7 text-borg-green" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Persistent Sessions
                </h3>
                <p className="text-borg-gray">
                  Stay logged in across visits. Your session is securely
                  maintained using industry-standard JWT tokens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-borg-border">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-borg-gray text-sm">
              © {new Date().getFullYear()} XBorg.
              {/* <a
                href="https://swissborg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-borg-green hover:underline"
              >
                SwissBorg
              </a> */}
              .
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
