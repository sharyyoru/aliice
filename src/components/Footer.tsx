"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
          <Image
            src="https://www.aliice.space/build/images/aliice-dark.png"
            alt="Aliice"
            width={100}
            height={33}
            className="h-6 w-auto brightness-0 invert"
            unoptimized
          />
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Aliice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
