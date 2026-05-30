import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import { useScreenAudio } from '@/hooks/useScreenAudio';

export default function SessionComplete({ totalPoints, maxPossiblePoints, levelCount, onHome, onReplay }) {
  const { lang } = useLanguage();

  const maxPoints = maxPossiblePoints || levelCount * 15;
  const percent = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  const headline = lang === 'es' ? '¡Sesión Completa!' : 'Session Complete!';
  const subtitle = lang === 'es'
    ? `¡Completaste el Quiz Rápido!`
    : `You completed the Quick Quiz!`;
  const pointsLabel = lang === 'es' ? 'Puntos de Sabiduría Ganados' : 'Wisdom Points Earned';
  const replayLabel = lang === 'es' ? 'JUGAR DE NUEVO' : 'PLAY AGAIN';
  const homeLabel = lang === 'es' ? 'IR A INICIO' : 'GO HOME';

  const encouragement = percent >= 80
    ? (lang === 'es' ? '¡Eres una experta en detectar fraudes!' : "You're a scam-spotting expert!")
    : percent >= 50
    ? (lang === 'es' ? '¡Buen trabajo! Sigue practicando.' : 'Great effort! Keep practicing.')
    : (lang === 'es' ? '¡Cada intento te hace más sabia!' : 'Every try makes you wiser!');

  useScreenAudio(
    () => `${headline} ${subtitle} ${encouragement} ${lang === 'es' ? `Ganaste ${totalPoints} puntos.` : `You earned ${totalPoints} points.`}`,
    [lang, totalPoints]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col items-center justify-between px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="flex flex-col items-center gap-4 w-full max-w-sm"
      >
        <div className="text-6xl">🎉</div>
        <h1 className="text-3xl font-black text-gold text-center">{headline}</h1>
        <p className="text-lg font-semibold text-white/80 text-center">{subtitle}</p>

        <img src={IMAGES.sage_full} alt="Sage" className="w-40 h-48 object-contain drop-shadow-2xl" />

        {/* Points card */}
        <div className="w-full bg-white/10 rounded-3xl p-6 border border-white/20 text-center">
          <p className="text-white/70 font-bold text-base mb-1">{pointsLabel}</p>
          <p className="text-5xl font-black text-gold">+{totalPoints}</p>
          <p className="text-white/60 text-sm mt-1">/ {maxPoints} {lang === 'es' ? 'posible' : 'possible'}</p>
        </div>

        <div className="bg-white/10 rounded-2xl px-5 py-4 w-full text-center border border-white/20">
          <p className="text-white font-bold text-base">{encouragement}</p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3 w-full max-w-sm mt-6">
        <button
          onClick={onReplay}
          className="w-full py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          {replayLabel}
        </button>
        <button
          onClick={onHome}
          className="w-full py-4 bg-white/10 text-white font-black text-xl rounded-2xl border-2 border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
        >
          {homeLabel}
        </button>
      </div>
    </div>
  );
}