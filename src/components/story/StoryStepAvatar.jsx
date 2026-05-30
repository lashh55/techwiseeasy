import React, { useState } from 'react';
import { IMAGES } from '@/lib/images';

const avatars = [
  { id: 'a1', image: IMAGES.avatar_1, label: 'Woman 1' },
  { id: 'a2', image: IMAGES.avatar_2, label: 'Man 1' },
  { id: 'a3', image: IMAGES.avatar_3, label: 'Woman 2' },
  { id: 'a4', image: IMAGES.avatar_4, label: 'Man 2' },
  { id: 'a5', image: IMAGES.avatar_5, label: 'Man 3' },
  { id: 'a6', image: IMAGES.avatar_6, label: 'Man 4' },
  { id: 'a7', image: IMAGES.avatar_7, label: 'Man 5' },
  { id: 'a8', image: IMAGES.avatar_8, label: 'Man 6' },
  { id: 'a9', image: IMAGES.avatar_9, label: 'Woman 3' },
  { id: 'a10', image: IMAGES.avatar_10, label: 'Man 7' },
  { id: 'a11', image: IMAGES.avatar_11, label: 'Woman 4' },
  { id: 'a12', image: IMAGES.avatar_12, label: 'Woman 5' },
];

export default function StoryStepAvatar({ value, onSelect, onNext }) {
  const [selected, setSelected] = useState(value || null);

  const handleSelect = (id) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-5">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">Choose Your Look</h2>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleSelect(avatar.id)}
            className={`flex items-center justify-center w-full aspect-square rounded-2xl overflow-hidden transition-all ${
              selected === avatar.id
                ? 'ring-4 ring-gold shadow-lg scale-105'
                : 'ring-2 ring-white/20 hover:ring-white/40'
            }`}
          >
            <img src={avatar.image} alt={avatar.label} className="w-full h-full object-cover" />
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
        Skip — just me
      </button>
    </div>
  );
}