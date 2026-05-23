import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioNarration({ onNext, value, onChange }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(value !== undefined ? value : true);

  const handleSelect = (val) => {
    setSelected(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-56 h-48 flex-shrink-0 mb-4"
      >
        <img src={IMAGES.audio_narration} alt="Audio Narration" className="w-full h-full object-contain rounded-2xl" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center leading-snug mb-6"
      >
        {t('audio_title')}
      </motion.h2>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => handleSelect(true)}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all min-h-[72px] ${
            selected === true
              ? 'bg-gold/20 border-gold text-white shadow-lg'
              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
          }`}
        >
          <Volume2 className="w-8 h-8 flex-shrink-0" />
          <span className="text-xl font-bold">{t('audio_yes')}</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleSelect(false)}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all min-h-[72px] ${
            selected === false
              ? 'bg-gold/20 border-gold text-white shadow-lg'
              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
          }`}
        >
          <VolumeX className="w-8 h-8 flex-shrink-0" />
          <span className="text-xl font-bold">{t('audio_no')}</span>
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('got_it')}
      </motion.button>
    </div>
  );
}