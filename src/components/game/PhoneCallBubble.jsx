import React from 'react';
import { Phone } from 'lucide-react';

export default function PhoneCallBubble({ callerName, callerNumber, scenario }) {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      {/* Incoming call screen */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
        {/* Status bar */}
        <div className="bg-black/40 px-4 py-1.5 flex justify-between items-center">
          <span className="text-white/60 text-xs font-semibold">9:41 AM</span>
          <span className="text-white/60 text-xs font-semibold">📶 🔋</span>
        </div>

        {/* Call header */}
        <div className="px-6 pt-6 pb-4 flex flex-col items-center gap-4 bg-gradient-to-b from-gray-800 to-gray-900">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase">Incoming Call</p>

          {/* Caller avatar */}
          <div className="w-20 h-20 rounded-full bg-green-700 flex items-center justify-center border-4 border-green-500 shadow-lg">
            <Phone className="w-9 h-9 text-white" />
          </div>

          {/* Caller info */}
          <div className="text-center">
            <p className="text-white font-black text-2xl leading-tight">{callerName}</p>
            <p className="text-white/60 text-base font-semibold mt-1">{callerNumber}</p>
          </div>

          {/* Action buttons (decorative) */}
          <div className="flex gap-10 mt-2 mb-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full bg-red-500/80 flex items-center justify-center">
                <span className="text-2xl">📵</span>
              </div>
              <span className="text-white/50 text-xs font-semibold">Decline</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-full bg-green-500/80 flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <span className="text-white/50 text-xs font-semibold">Accept</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario speech bubble */}
      <div className="bg-white/15 border border-white/25 rounded-2xl px-4 py-4">
        <p className="text-white/70 text-xs font-bold uppercase tracking-wide mb-2">📖 What happened:</p>
        <p className="text-white font-semibold text-sm leading-relaxed">{scenario}</p>
      </div>
    </div>
  );
}