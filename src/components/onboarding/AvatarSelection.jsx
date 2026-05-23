import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

const avatars = [
  { id: 'a1', emoji: '👩🏾‍🦳', label: 'Woman 1' },
  { id: 'a2', emoji: '👨🏽‍🦳', label: 'Man 1' },
  { id: 'a3', emoji: '👩🏻‍🦳', label: 'Woman 2' },
  { id: 'a4', emoji: '👨🏿‍🦳', label: 'Man 2' },
  { id: 'a5', emoji: '👩🏼‍🦲', label: 'Woman 3' },
  { id: 'a6', emoji: '👨🏾‍🦲', label: 'Man 3' },
  { id: 'a7', emoji: '🧓🏻', label: 'Person 1' },
  { id: 'a8', emoji: '🧓🏿', label: 'Person 2' },
  { id: 'a9', emoji: '👵🏽', label: 'Woman 4' },
  { id: 'a10', emoji: '👴🏼', label: 'Man 4' },
  { id: 'a11', emoji: '🧑🏾‍🦳', label: 'Person 3' },
  { id: 'a12', emoji: '👩🏿‍🦱', label: 'Woman 5' },
];

export default function AvatarSelection({ onNext, avatarValue, nameValue, onAvatarChange, onNameChange }) {
  const { t } = useLanguage();
  const [selectedAvatar, setSelectedAvatar] = useState(avatarValue || 'a1');
  const [name, setName] = useState(nameValue || '');

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
    onAvatarChange(id);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    onNameChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center leading-snug mb-6"
      >
        {t('avatar_title')}
      </motion.h2>

      {/* Avatar grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-3 w-full max-w-sm mb-6"
      >
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleAvatarSelect(avatar.id)}
            className={`flex items-center justify-center w-full aspect-square rounded-2xl text-4xl transition-all ${
              selectedAvatar === avatar.id
                ? 'bg-gold/30 border-3 border-gold shadow-lg scale-110'
                : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
            }`}
          >
            {avatar.emoji}
          </button>
        ))}
      </motion.div>

      {/* Name input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm"
      >
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder={t('avatar_name_placeholder')}
          className="w-full px-5 py-4 rounded-2xl bg-white/10 border-2 border-white/20 text-white text-xl font-semibold placeholder:text-white/50 focus:outline-none focus:border-gold transition-all min-h-[64px]"
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('this_is_me')}
      </motion.button>
    </div>
  );
}