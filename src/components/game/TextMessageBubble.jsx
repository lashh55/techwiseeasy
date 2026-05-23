import React from 'react';

export default function TextMessageBubble({ sender, message }) {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone message UI */}
      <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
        {/* Header bar */}
        <div className="bg-gray-200 px-4 py-3 flex items-center gap-3 border-b border-gray-300">
          <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {sender.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">{sender}</p>
            <p className="text-xs text-gray-500">Text Message</p>
          </div>
        </div>
        {/* Message area */}
        <div className="bg-white px-4 py-5 min-h-[100px] flex items-end">
          <div className="bg-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%] relative">
            <p className="text-gray-800 text-base font-medium leading-relaxed">{message}</p>
            <p className="text-xs text-gray-400 mt-1 text-right">Now</p>
          </div>
        </div>
      </div>
    </div>
  );
}