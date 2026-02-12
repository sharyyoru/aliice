"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onStartTrial: () => void;
}

export default function Header({ onStartTrial }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#workflows", label: "Workflows" },
    { href: "#showcase", label: "Product" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-aliice-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Image
              src="https://www.aliice.space/build/images/aliice-dark.png"
              alt="Aliice"
              width={200}
              height={67}
              className="h-8 w-auto lg:h-10"
              priority
              unoptimized
            />
          </Link>

          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <button onClick={onStartTrial} className="btn-primary">
              Request a Demo
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-slate-600 hover:text-aliice-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onStartTrial();
                }}
                className="btn-primary w-full"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
