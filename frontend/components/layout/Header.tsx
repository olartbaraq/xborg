"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-borg-dark/80 backdrop-blur-xl border-b border-borg-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-borg-green to-borg-green-light flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              XBorg
            </span>
          </Link>

          {/* Navigation */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-borg-gray hover:text-white transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:block">Profile</span>
              </Link>

              <div className="h-6 w-px bg-borg-border" />

              <div className="flex items-center gap-3">
                <Avatar
                  name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                  size="sm"
                />
                <span className="text-white text-sm hidden md:block">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                <span className="hidden sm:block">Logout</span>
              </Button>
            </div>
          ) : (
            <Link href="/signin">
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
