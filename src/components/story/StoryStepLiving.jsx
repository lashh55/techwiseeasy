import React, { useState } from 'react';

const OPTIONS = [
  'Live alone in my own home',
  'Live alone in an apartment',
  'Live with my spouse',
  "Live with my adult child's family",
  'Live with a friend or sibling',
];

export default function StoryStepLiving({ value, onSelect, onNext }) {
  const [selected, setSelected] = useState(value || null);

  const handleSelect = (v) => {
    setSelected(v);
    onSelect(v);
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-4">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">Living Situation</h2>
        <p className="text-white/70 font-semibold text-base mt-1">Where do you call home?</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            className={`w-full py-4 px-5 rounded-2xl font-bold text-lg text-left transition-all ${
              selected === opt
                ? 'bg-gold text-navy ring-4 ring-gold shadow-lg'
                : 'bg-white/10 text-white ring-2 ring-white/10 hover:ring-white/30'
            }`}
          >
            {opt}
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