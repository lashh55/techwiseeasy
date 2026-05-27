import React from 'react';
import { ThumbsUp, MessageCircle, Share2, Globe } from 'lucide-react';

export default function FacebookPostBubble({ pageName, postText }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden font-sans">
      {/* Facebook-style top bar */}
      <div className="bg-[#1877F2] px-4 py-2 flex items-center gap-2">
        <div className="text-white font-black text-lg tracking-wide">f</div>
        <span className="text-white/80 text-xs font-semibold">Facebook</span>
      </div>

      {/* Post header */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        {/* Page avatar */}
        <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0 text-white font-black text-lg shadow">
          R
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-bold text-[#050505] text-sm">{pageName}</span>
            <span className="text-[#1877F2] text-sm font-bold" title="Verified Page">✓</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <span>Just now</span>
            <span>·</span>
            <Globe className="w-3 h-3" />
          </div>
        </div>
        <div className="text-gray-400 text-xl leading-none">···</div>
      </div>

      {/* Post text */}
      <div className="px-4 pb-3">
        <p className="text-[#050505] text-sm leading-relaxed">{postText}</p>
      </div>

      {/* Fake photo placeholder */}
      <div className="w-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center py-6 border-y border-gray-200">
        <span className="text-5xl mb-1">🏕️</span>
        <span className="text-blue-600 font-semibold text-xs">Riverside RV Center — Giveaway</span>
      </div>

      {/* Reaction counts */}
      <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-xs border-b border-gray-100">
        <span>👍❤️ 4,832</span>
        <span>1,204 comments · 9,761 shares</span>
      </div>

      {/* Action buttons */}
      <div className="px-2 py-1 flex items-center justify-around">
        {[
          { icon: ThumbsUp, label: 'Like' },
          { icon: MessageCircle, label: 'Comment' },
          { icon: Share2, label: 'Share' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-gray-600 font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}