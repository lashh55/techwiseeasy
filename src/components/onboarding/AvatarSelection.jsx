import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
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
  { id: 'a_owl', image: IMAGES.avatar_owl, label: 'Owl' },
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
        className="text-2xl font-bold text-white text-center leading-snug mb-4"
      >
        {t('avatar_title')}
      </motion.h2>

      {/* Avatar grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-4 gap-3 w-full max-w-sm mb-4"
      >
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => handleAvatarSelect(avatar.id)}
            className={`flex items-center justify-center w-full aspect-square rounded-2xl overflow-hidden transition-all ${
              selectedAvatar === avatar.id
                ? 'ring-4 ring-gold shadow-lg scale-105'
                : 'ring-2 ring-white/20 hover:ring-white/40'
            }`}
          >
            <img src={avatar.image} alt={avatar.label} className="w-full h-full object-cover" />
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
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-4 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('this_is_me')}
      </motion.button>
    </div>
  );
}