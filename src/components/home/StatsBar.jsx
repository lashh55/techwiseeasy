import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function StatsBar({ wisdomPoints, streak }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mx-5 mt-2 bg-white/10 rounded-2xl p-4 flex justify-around border border-white/20"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-black text-gold">{wisdomPoints}</span>
        <span className="text-sm font-bold text-white/80">⭐ {t('wisdom_points')}</span>
      </div>
      <div className="w-px bg-white/20" />
      <div className="flex flex-col items-center gap-1">
        <span className="text-3xl font-black text-orange-400">{streak}</span>
        <span className="text-sm font-bold text-white/80">🔥 {t('daily_streak')}</span>
      </div>
    </motion.div>
  );
}