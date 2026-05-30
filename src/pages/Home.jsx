import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import StatsBar from '@/components/home/StatsBar';
import GameCard from '@/components/home/GameCard';
import MilestoneBanner from '@/components/gamification/MilestoneBanner';
import { checkMilestones } from '@/lib/milestones';
import { useSyncTTS } from '@/hooks/useSyncTTS';
import TTSButton from '@/components/TTSButton';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  useSyncTTS();
  const [progress, setProgress] = useState(null);
  const [newMilestone, setNewMilestone] = useState(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const records = await base44.entities.UserProgress.list();
    if (records && records.length > 0) {
      const p = records[0];
      setProgress(p);
      // Check for new milestones
      const milestone = checkMilestones(p);
      if (milestone) setNewMilestone(milestone);
    }
  };

  const displayName = progress?.display_name || 'Friend';

  const games = [
    { key: 'spot_the_scam', image: IMAGES.spot_the_scam, label: t('play_spot_the_scam'), color: 'from-red-500 to-orange-500', path: '/spot-the-scam' },
    { key: 'password_power', image: IMAGES.password_power, label: t('play_password_power'), color: 'from-blue-500 to-cyan-500', path: '/home' },
    { key: 'app_navigator', image: IMAGES.app_navigator, label: t('play_app_navigator'), color: 'from-green-500 to-emerald-500', path: '/home' },
    { key: 'myth_vs_fact', image: IMAGES.myth_vs_fact, label: t('play_myth_vs_fact'), color: 'from-purple-500 to-violet-500', path: '/home' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex justify-end mb-2"><TTSButton /></div>
        <div className="flex items-center gap-4">
          <img src={IMAGES.sage_full} alt="Sage" className="w-16 h-20 object-contain drop-shadow-lg" />
          <div>
            <p className="text-white/80 text-lg font-semibold">{t('home_greeting')},</p>
            <h1 className="text-2xl font-black text-white leading-tight">{displayName}!</h1>
            <p className="text-white/70 text-base font-medium mt-0.5">{t('home_subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar
        wisdomPoints={progress?.wisdom_points || 0}
        streak={progress?.current_streak || 0}
      />

      {/* Tutorial CTA (if not completed) */}
      {progress && !progress.tutorial_complete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mt-4"
        >
          <button
            onClick={() => navigate('/tutorial')}
            className="w-full py-4 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>📚</span> {t('start_tutorial')}
          </button>
        </motion.div>
      )}

      {/* Game cards */}
      <div className="px-5 pt-5 pb-8 grid grid-cols-2 gap-4 flex-1">
        {games.map((game, i) => (
          <GameCard key={game.key} game={game} index={i} onClick={() => navigate(game.path)} />
        ))}
      </div>

      {/* Milestone banner */}
      {newMilestone && (
        <MilestoneBanner
          milestone={newMilestone}
          onDismiss={() => setNewMilestone(null)}
        />
      )}
    </div>
  );
}