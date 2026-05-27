import React from 'react';

export default function PrivateMessageThreadBubble({ contactName, messages, scenario }) {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      {/* Messenger-style header */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0095f6] to-[#833ab4] px-4 py-2 flex items-center gap-2">
          <span className="text-white font-black text-sm tracking-wide">Direct Message</span>
        </div>

        {/* Contact info */}
        <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-black text-base flex-shrink-0">
            {contactName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{contactName}</p>
            <p className="text-gray-400 text-xs">Active recently</p>
          </div>
        </div>

        {/* Message thread */}
        <div className="px-3 py-3 flex flex-col gap-2 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                {contactName.charAt(0)}
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm max-w-[80%]">
                <p className="text-gray-800 text-sm leading-relaxed">{msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario context */}
      <div className="bg-white/15 border border-white/25 rounded-2xl px-4 py-3">
        <p className="text-white/90 text-sm font-semibold leading-relaxed text-center">{scenario}</p>
      </div>
    </div>
  );
}