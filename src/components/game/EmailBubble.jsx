import React from 'react';
import { Mail } from 'lucide-react';

export default function EmailBubble({ senderName, senderEmail, subject, message }) {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Email header bar */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Email</span>
      </div>

      {/* From / Subject */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 text-white font-black text-base">
            {senderName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-navy text-sm">{senderName}</p>
            <p className="text-gray-500 text-xs truncate">{senderEmail}</p>
          </div>
        </div>
        <p className="font-bold text-navy text-sm leading-snug">{subject}</p>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}