import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

const sizes = [
  { id: 'standard', textClass: 'text-lg' },
  { id: 'large', textClass: 'text-xl' },
  { id: 'extra_large', textClass: 'text-2xl' },
];

export default function ChooseTextSize({ onNext, value, onChange }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(value || 'large');

  const handleSelect = (id) => {
    setSelected(id);
    onChange(id);
  };

  const labelMap = {
    standard: t('standard'),
    large: t('large'),
    extra_large: t('extra_large'),
  };

  const sampleText = "TechWiseEasy keeps you safe online.";

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-48 h-48 flex-shrink-0 mb-4"
      >
        <img src={IMAGES.text_size} alt="Text Size" className="w-full h-full object-contain rounded-2xl" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center leading-snug mb-6"
      >
        {t('text_size_title')}
      </motion.h2>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {sizes.map((size, i) => (
          <motion.button
            key={size.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(size.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all min-h-[72px] ${
              selected === size.id
                ? 'bg-gold/20 border-gold text-white shadow-lg'
                : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
            }`}
          >
            <span className={`font-bold ${size.textClass}`}>A</span>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold">{labelMap[size.id]}</span>
              <span className={`${size.textClass} font-medium opacity-80`}>{sampleText}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('this_looks_good')}
      </motion.button>
    </div>
  );
}