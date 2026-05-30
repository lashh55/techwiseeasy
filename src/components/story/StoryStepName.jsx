import React, { useState } from 'react';

export default function StoryStepName({ value, onChange, onNext }) {
  const [name, setName] = useState(value || '');

  const handleChange = (e) => {
    setName(e.target.value);
    onChange(e.target.value);
  };

  const handleContinue = () => {
    onChange(name.trim());
    onNext();
  };

  const handleSkip = () => {
    onChange('');
    onNext();
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-6">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">What's Your Name?</h2>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-2">
        <label className="text-white/80 font-semibold text-base">What should we call you?</label>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name..."
          autoFocus
          className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-xl font-semibold placeholder:text-white/40 focus:outline-none focus:border-gold transition-all min-h-[64px]"
        />
        <p className="text-white/50 text-sm font-medium">This is the name Sage will use.</p>
      </div>

      <button
        onClick={handleContinue}
        disabled={name.trim().length < 2}
        className={`w-full max-w-sm py-5 font-black text-xl rounded-2xl shadow-lg transition-all min-h-[68px] ${
          name.trim().length >= 2
            ? 'bg-gold text-navy hover:bg-yellow-400 active:scale-[0.98]'
            : 'bg-white/20 text-white/40 cursor-not-allowed'
        }`}
      >
        Continue →
      </button>

      <button
        onClick={handleSkip}
        className="text-white/50 font-semibold text-base hover:text-white/80 transition-colors py-2"
      >
        Skip — call me "Friend"
      </button>
    </div>
  );
}