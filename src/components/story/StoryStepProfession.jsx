import React, { useState } from 'react';

const PROFESSIONS = [
  'Accountant', 'Bus driver', 'Chef', 'Doctor', 'Engineer',
  'Factory worker', 'Farmer', 'Fireman', 'Hairdresser', 'Homemaker',
  'Lawyer', 'Librarian', 'Mechanic', 'Military', 'Nurse',
  'Pastor', 'Police officer', 'Postal worker', 'Schoolteacher', 'Small business owner',
];

export default function StoryStepProfession({ value, onSelect, onNext }) {
  const [selected, setSelected] = useState(value || null);

  const handleSelect = (p) => {
    setSelected(p);
    onSelect(p);
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-4">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">Pick a Profession</h2>
        <p className="text-white/70 font-semibold text-base mt-1">What were you — or what did you always want to be?</p>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-2 overflow-y-auto max-h-[50vh] pb-1">
        {PROFESSIONS.map((p) => (
          <button
            key={p}
            onClick={() => handleSelect(p)}
            className={`py-3 px-4 rounded-2xl font-bold text-sm text-left transition-all ${
              selected === p
                ? 'bg-gold text-navy ring-4 ring-gold shadow-lg'
                : 'bg-white/10 text-white ring-2 ring-white/10 hover:ring-white/30'
            }`}
          >
            {p}
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
        Skip — none of these
      </button>
    </div>
  );
}