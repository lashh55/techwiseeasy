import React, { useState } from 'react';

const OPTIONS = [
  { label: 'Small dog', emoji: '🐶' },
  { label: 'Big dog', emoji: '🐕' },
  { label: 'Indoor cat', emoji: '🐱' },
  { label: 'Outdoor cat', emoji: '🐈' },
  { label: 'Parakeet', emoji: '🦜' },
  { label: 'Canary', emoji: '🐦' },
  { label: 'Goldfish', emoji: '🐟' },
  { label: 'Just me', emoji: '😊' },
];

export default function StoryStepPet({ value, onSelect, onNext }) {
  const [selected, setSelected] = useState(value || null);

  const handleSelect = (v) => {
    setSelected(v);
    onSelect(v);
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-4">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">Got a Pet?</h2>
        <p className="text-white/70 font-semibold text-base mt-1">Anyone else at home?</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {OPTIONS.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleSelect(opt.label)}
            className={`flex flex-col items-center justify-center py-5 px-3 rounded-2xl font-bold text-base transition-all gap-2 ${
              selected === opt.label
                ? 'bg-gold text-navy ring-4 ring-gold shadow-lg'
                : 'bg-white/10 text-white ring-2 ring-white/10 hover:ring-white/30'
            }`}
          >
            <span className="text-3xl">{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className={`w-full max-w-sm py-5 font-black text-xl rounded-2xl shadow-lg transition-all min-h-[68px] ${
          selected
            ? 'bg-gold text-navy hover:bg-yellow-400 active:scale-[0.98]'
            : 'bg-white/20 text-white/40 cursor-not-allowed'
        }`}
      >
        Continue →
      </button>

      <button
        onClick={() => { onSelect(null); onNext(); }}
        className="text-white/50 font-semibold text-base hover:text-white/80 transition-colors py-2"
      >
        Skip
      </button>
    </div>
  );
}