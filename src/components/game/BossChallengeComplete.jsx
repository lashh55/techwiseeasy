import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { useScreenAudio } from '@/hooks/useScreenAudio';

export default function BossChallengeComplete({ totalPoints, onClaim }) {
  const { lang } = useLanguage();
  const [showBadge, setShowBadge] = useState(false);

  useScreenAudio(
    () => lang === 'es'
      ? `¡Experta en Correos! Completaste el Reto Final de Correos. Ganaste ${totalPoints} puntos.`
      : `Email Expert Unlocked! You completed the Email Boss Challenge. You earned ${totalPoints} points.`,
    [lang, totalPoints]
  );

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col items-center justify-center px-6 py-10 text-center">

      {/* Trophy */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="text-8xl mb-2"
      >
        🏆
      </motion.div>

      {/* Sage */}
      <motion.img
        src={IMAGES.sage_full}
        alt="Sage celebrating"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-32 h-40 object-contain mb-2"
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-black text-gold leading-tight mb-1"
      >
        {lang === 'es' ? '¡Experta en Correos!' : 'Email Expert Unlocked!'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-white/80 font-bold text-base mb-6"
      >
        {lang === 'es' ? 'Completaste el Reto Final de Correos' : 'You completed the Email Boss Challenge'}
      </motion.p>

      {/* Badge */}
      {showBadge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="bg-gold/20 border-4 border-gold rounded-3xl px-8 py-5 mb-6 flex flex-col items-center gap-2"
        >
          <span className="text-5xl">📧</span>
          <p className="text-gold font-black text-lg">
            {lang === 'es' ? 'Insignia: Experta en Correos' : 'Badge: Email Expert'}
          </p>
          <p className="text-white/60 text-sm font-semibold">
            {lang === 'es' ? '¡Insignia ganada!' : 'Badge awarded!'}
          </p>
        </motion.div>
      )}

      {/* Points */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-white/10 rounded-2xl px-8 py-4 mb-8 flex items-center gap-3"
      >
        <span className="text-3xl">⭐</span>
        <div className="text-left">
          <p className="text-white/60 text-sm font-bold">
            {lang === 'es' ? 'Puntos del Reto' : 'Challenge Points'}
          </p>
          <p className="text-gold font-black text-3xl">+{totalPoints}</p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        onClick={onClaim}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-xl hover:bg-yellow-400 active:scale-[0.98] transition-all"
      >
        {lang === 'es' ? 'RECLAMAR MI INSIGNIA →' : 'CLAIM MY BADGE →'}
      </motion.button>
    </div>
  );
}