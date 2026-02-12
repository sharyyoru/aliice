"use client";

import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

export default function QRPage() {
  const siteUrl = "https://aliice.vercel.app/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
        <Image
          src="https://www.aliice.space/build/images/aliice-dark.png"
          alt="Aliice Logo"
          width={180}
          height={60}
          className="mx-auto mb-8"
          unoptimized
        />
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Scan to Visit
        </h1>
        <p className="text-slate-600 mb-8">
          Point your camera at the QR code
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-inner border-4 border-slate-100 inline-block mb-8">
          <QRCodeSVG
            value={siteUrl}
            size={220}
            level="H"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#1e293b"
          />
        </div>

        <p className="text-sm text-slate-500">
          {siteUrl}
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            Medical ERP + CRM Platform
          </p>
        </div>
      </div>
    </div>
  );
}
