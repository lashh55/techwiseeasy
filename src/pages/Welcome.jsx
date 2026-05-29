import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import { base44 } from '@/api/base44Client';

export default function Welcome() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSkipToGame = async () => {
    localStorage.setItem('twe_test_mode', 'true');
    const records = await base44.entities.UserProgress.list();
    if (!records || records.length === 0) {
      await base44.entities.UserProgress.create({
        display_name: 'Tester',
        avatar_id: 'a1',
        onboarding_complete: true,
        tutorial_complete: true,
        wisdom_points: 0,
        current_streak: 0,
        earned_badges: [],
      });
    }
    navigate('/spot-the-scam');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-60px] w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute bottom-[-100px] left-[-80px] w-80 h-80 bg-white/5 rounded-full" />

      {/* Language toggle top-right */}
      <div className="w-full flex justify-end pt-2 z-10">
        <LanguageToggle />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 z-10 max-w-md w-full">
        {/* Logo / App name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            Tech<span className="text-gold">Wise</span>Easy
          </h1>
        </motion.div>

        {/* Sage character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-64 h-72 flex items-center justify-center"
        >
          <img
            src={IMAGES.sage_full}
            alt="Sage — your guide"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-3"
        >
          <p className="text-2xl font-bold text-white leading-snug">
            {t('welcome_tagline')}
          </p>
          <p className="text-lg font-semibold text-gold">
            {t('welcome_subtitle')}
          </p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="w-full max-w-md pb-4 z-10"
      >
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
        >
          {t('lets_get_started')}
        </button>

        {/* Dev-only test shortcut */}
        <div className="flex justify-end mt-3 pr-1">
          <button
            onClick={handleSkipToGame}
            className="text-white/30 text-xs font-semibold hover:text-white/60 transition-colors"
          >
            Skip to Game (Test)
          </button>
        </div>
      </motion.div>
    </div>
  );
}