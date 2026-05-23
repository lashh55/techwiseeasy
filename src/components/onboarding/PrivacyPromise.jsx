import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

export default function PrivacyPromise({ onNext }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-64 h-56 flex-shrink-0 mb-4"
      >
        <img src={IMAGES.data_never_stored} alt="Your Data Is Never Stored" className="w-full h-full object-contain rounded-2xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-4 max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white leading-snug">
          {t('privacy_title')}
        </h2>
        <p className="text-xl font-medium text-white/90 leading-relaxed">
          {t('privacy_body')}
        </p>
        <p className="text-base font-medium text-white/70 leading-relaxed">
          {t('privacy_subtext')}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('i_understand')}
      </motion.button>
    </div>
  );
}