import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import { useScreenAudio } from '@/hooks/useScreenAudio';

export default function MeetSage({ onNext }) {
  const { t, lang } = useLanguage();
  useScreenAudio(() => t('meet_sage_speech'), [lang]);

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      {/* Sage image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-52 h-56 flex-shrink-0"
      >
        <img src={IMAGES.sage_full} alt="Sage" className="w-full h-full object-contain" />
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-lg relative mt-4 max-w-sm"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />
        <p className="text-xl font-semibold text-navy leading-relaxed relative z-10">
          {t('meet_sage_speech')}
        </p>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('im_ready_sage')}
      </motion.button>
    </div>
  );
}