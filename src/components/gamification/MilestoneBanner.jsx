import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';

export default function MilestoneBanner({ milestone, onDismiss }) {
  const { t } = useLanguage();

  const handleDismiss = async () => {
    // Save badge to user progress
    const records = await base44.entities.UserProgress.list();
    if (records && records.length > 0) {
      const current = records[0];
      const earned = current.earned_badges || [];
      await base44.entities.UserProgress.update(current.id, {
        earned_badges: [...earned, milestone.id],
      });
    }
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-gradient-to-b from-navy to-brand-blue rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border-2 border-gold"
      >
        <div className="text-7xl mb-4">{milestone.emoji}</div>
        <h2 className="text-2xl font-black text-gold mb-2">{t('milestone_title')}</h2>
        <h3 className="text-xl font-black text-white mb-2">{t(milestone.titleKey)}</h3>
        <p className="text-lg font-semibold text-white/80 mb-8">{t(milestone.descKey)}</p>
        <button
          onClick={handleDismiss}
          className="w-full py-4 bg-gold text-navy font-black text-xl rounded-2xl hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          {t('milestone_dismiss')}
        </button>
      </motion.div>
    </div>
  );
}