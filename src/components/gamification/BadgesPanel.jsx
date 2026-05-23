import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { MILESTONES } from '@/lib/milestones';

export default function BadgesPanel({ earnedBadges = [] }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {MILESTONES.map((m) => {
        const earned = earnedBadges.includes(m.id);
        return (
          <div
            key={m.id}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
              earned
                ? 'bg-gold/20 border-gold'
                : 'bg-white/5 border-white/10 opacity-50'
            }`}
          >
            <span className="text-3xl">{earned ? m.emoji : '🔒'}</span>
            <span className="text-xs font-bold text-white text-center leading-tight">
              {t(m.titleKey)}
            </span>
          </div>
        );
      })}
    </div>
  );
}