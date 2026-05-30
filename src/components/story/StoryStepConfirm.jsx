import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';

const AVATAR_IMAGES = {
  a1: IMAGES.avatar_1,
  a2: IMAGES.avatar_2,
  a3: IMAGES.avatar_3,
  a4: IMAGES.avatar_4,
  a5: IMAGES.avatar_5,
  a6: IMAGES.avatar_6,
  a7: IMAGES.avatar_7,
  a8: IMAGES.avatar_8,
  a9: IMAGES.avatar_9,
  a10: IMAGES.avatar_10,
  a11: IMAGES.avatar_11,
  a12: IMAGES.avatar_12,
};

export default function StoryStepConfirm({ character, onStart, onBack, saving }) {
  const displayName = character.name?.trim() || 'Friend';
  const avatarImg = character.avatar_id ? AVATAR_IMAGES[character.avatar_id] : null;

  // Build summary sentence — only include non-null fields
  const parts = [];
  if (character.name?.trim()) parts.push(character.name.trim());
  if (character.profession) parts.push(`retired ${character.profession.toLowerCase()}`);
  if (character.family) parts.push(character.family.toLowerCase());
  if (character.living) parts.push(character.living.toLowerCase());
  if (character.pet && character.pet !== 'Just me') parts.push(`with a ${character.pet.toLowerCase()}`);

  const summary = parts.length > 0 ? parts.join(', ') + '.' : null;

  const summaryItems = [
    character.profession && { label: 'Profession', value: character.profession },
    character.family && { label: 'Family', value: character.family },
    character.living && { label: 'Home', value: character.living },
    character.pet && { label: 'Pet', value: character.pet },
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-5">
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">Story Mode</p>
        <h2 className="text-white font-black text-2xl leading-tight">Meet {displayName}</h2>
      </div>

      {/* Character card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Avatar */}
        <div className="flex justify-center pt-6 pb-4 bg-gradient-to-b from-light-blue to-white">
          {avatarImg ? (
            <img
              src={avatarImg}
              alt={displayName}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-gold shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-100 ring-4 ring-gold flex items-center justify-center text-5xl shadow-lg">
              👤
            </div>
          )}
        </div>

        {/* Name */}
        <div className="px-6 pb-2 text-center">
          <h3 className="text-navy font-black text-2xl">{displayName}</h3>
        </div>

        {/* Details */}
        {summaryItems.length > 0 && (
          <div className="px-6 pb-6 flex flex-col gap-2">
            {summaryItems.map(item => (
              <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                <span className="text-muted-foreground font-semibold text-sm w-20 flex-shrink-0">{item.label}</span>
                <span className="text-navy font-bold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {summaryItems.length === 0 && (
          <div className="px-6 pb-6 text-center">
            <p className="text-gray-400 font-semibold text-sm">Your story begins fresh — Sage is ready!</p>
          </div>
        )}
      </motion.div>

      {/* Sage message */}
      <div className="flex items-start gap-3 bg-white/10 rounded-2xl p-4 w-full max-w-sm border border-white/20">
        <img src={IMAGES.sage_full} alt="Sage" className="w-10 h-14 object-contain flex-shrink-0" />
        <p className="text-white font-semibold text-sm leading-relaxed">
          {`I'm so glad to meet you, ${displayName}! I'll be right there with you every step of the way.`}
        </p>
      </div>

      <button
        onClick={onStart}
        disabled={saving}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {saving ? 'Saving...' : 'Start Day 1 →'}
      </button>

      <button
        onClick={onBack}
        className="text-white/50 font-semibold text-base hover:text-white/80 transition-colors py-2"
      >
        Go back and change something
      </button>
    </div>
  );
}