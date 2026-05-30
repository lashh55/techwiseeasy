import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { useScreenAudio } from '@/hooks/useScreenAudio';

export default function BossReviewScreen({ emails, answers, onShowMissed, onTryAgain, onSkipToBadge }) {
  const { lang } = useLanguage();

  const correctCount = answers.filter(a => a.correct).length;
  const total = emails.length;
  const missedIndices = answers.map((a, i) => (!a.correct ? i : null)).filter(i => i !== null);
  const missedNumbers = missedIndices.map(i => i + 1);

  const getMissedText = () => {
    if (missedNumbers.length === 0) return lang === 'es' ? '¡Ninguna! Perfecto.' : 'None! Perfect score!';
    if (missedNumbers.length === 1) return lang === 'es' ? `Fallaste la pregunta ${missedNumbers[0]}.` : `You missed question ${missedNumbers[0]}.`;
    const last = missedNumbers[missedNumbers.length - 1];
    const rest = missedNumbers.slice(0, -1).join(', ');
    return lang === 'es'
      ? `Fallaste las preguntas ${rest} y ${last}.`
      : `You missed questions ${rest}, and ${last}.`;
  };

  useScreenAudio(
    () => {
      const scoreText = lang === 'es'
        ? `Terminaste. Tuviste ${correctCount} de ${total} correctas. ${getMissedText()}`
        : `You finished! You got ${correctCount} out of ${total} correct. ${getMissedText()}`;
      return scoreText;
    },
    [lang, correctCount]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center gap-5"
    >
      <div className="text-6xl">📋</div>

      <h1 className="text-2xl font-black text-gold leading-tight">
        {lang === 'es' ? '¡Terminaste! Así te fue.' : "You finished! Here's how you did."}
      </h1>

      <div className="w-full max-w-sm bg-white/10 rounded-3xl p-5 border border-white/20 flex flex-col gap-3 text-center">
        <p className="text-white/60 font-bold text-sm">
          {lang === 'es' ? 'Tu resultado' : 'Your score'}
        </p>
        <p className="text-5xl font-black text-gold">{correctCount} <span className="text-white/60 text-3xl">/ {total}</span></p>
        <p className="text-white font-bold text-base">
          {lang === 'es' ? 'correctas' : 'correct'}
        </p>
        <div className="border-t border-white/10 pt-3">
          <p className="text-white/70 font-semibold text-sm">{getMissedText()}</p>
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3 mt-2">
        {missedIndices.length > 0 ? (
          <>
            <button
              onClick={onShowMissed}
              className="w-full py-5 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
            >
              {lang === 'es' ? 'Mostrar lo que fallé →' : 'Show Me What I Missed →'}
            </button>
            <button
              onClick={onTryAgain}
              className="w-full py-4 bg-white/10 text-white font-black text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
            >
              {lang === 'es' ? 'Intentarlo de nuevo por mi cuenta' : 'Let Me Try Again on My Own'}
            </button>
            <button
              onClick={onSkipToBadge}
              className="text-white/40 font-semibold text-sm hover:text-white/70 transition-colors py-2 mt-1"
            >
              {lang === 'es' ? 'Saltar a la insignia' : 'Skip to badge'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSkipToBadge}
              className="w-full py-5 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
            >
              {lang === 'es' ? 'RECLAMAR MI INSIGNIA →' : 'CLAIM MY BADGE →'}
            </button>
            <button
              onClick={onTryAgain}
              className="w-full py-4 bg-white/10 text-white font-bold text-base rounded-2xl border-2 border-white/20 hover:bg-white/20 active:scale-[0.98] transition-all"
            >
              {lang === 'es' ? 'Jugar de nuevo' : 'Play again anyway'}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}