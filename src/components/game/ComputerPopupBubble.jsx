import React from 'react';

export default function ComputerPopupBubble({ scenario }) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      {/* Browser window mock */}
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
        {/* Browser chrome */}
        <div className="bg-gray-200 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-0.5 text-gray-500 text-xs font-mono truncate">
            news-article-today.com/health-tips
          </div>
        </div>

        {/* Page content (blurred background suggestion) */}
        <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
          {/* Fake page background */}
          <div className="absolute inset-0 p-3 opacity-30 pointer-events-none select-none">
            <div className="h-3 bg-gray-400 rounded mb-2 w-3/4" />
            <div className="h-2 bg-gray-300 rounded mb-1.5 w-full" />
            <div className="h-2 bg-gray-300 rounded mb-1.5 w-5/6" />
            <div className="h-2 bg-gray-300 rounded mb-1.5 w-full" />
            <div className="h-2 bg-gray-300 rounded mb-3 w-2/3" />
            <div className="h-16 bg-gray-200 rounded w-full" />
          </div>

          {/* Darkened overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Pop-up */}
          <div className="relative z-10 bg-white rounded-xl border-4 border-red-600 shadow-2xl mx-4 w-full max-w-xs">
            {/* Red header bar */}
            <div className="bg-red-600 px-3 py-2 rounded-t-lg flex items-center gap-2">
              <span className="text-white text-sm font-black">⚠️ Windows Security Alert</span>
            </div>
            {/* Body */}
            <div className="px-4 py-3 flex flex-col items-center text-center gap-2">
              <span className="text-5xl animate-pulse">🚨</span>
              <p className="text-red-700 font-black text-sm leading-tight">
                VIRUS DETECTED
              </p>
              <p className="text-gray-800 font-bold text-xs leading-snug">
                CALL MICROSOFT SUPPORT IMMEDIATELY:
              </p>
              <p className="text-red-700 font-black text-base tracking-wide">
                1-888-555-0199
              </p>
              <p className="text-gray-500 text-xs">
                Do not close this window. Your data is at risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario description */}
      <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 w-full text-white text-sm font-semibold text-center leading-relaxed">
        {scenario}
      </div>
    </div>
  );
}