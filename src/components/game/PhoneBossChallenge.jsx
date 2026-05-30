import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import PhoneCallBubble from '@/components/game/PhoneCallBubble';
import BossReviewScreen from '@/components/game/BossReviewScreen.jsx';
import BossMissedPhoneReview from '@/components/game/BossMissedPhoneReview.jsx';
import { useScreenAudio } from '@/hooks/useScreenAudio';

// Rapid-fire phone boss challenge — 10 calls, tap REAL or SCAM
export default function PhoneBossChallenge({ level, onComplete, onRetry }) {
  const { lang } = useLanguage();
  const [callIndex, setCallIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [screen, setScreen] = useState('playing'); // 'playing' | 'review' | 'missed'

  const calls = level.emails; // reusing "emails" array for calls
  const current = calls[callIndex];

  const handleAnswer = (tappedScam) => {
    if (transitioning) return;
    const correct = tappedScam === current.isScam;
    const newAnswers = [...answers, { tappedScam, correct }];
    setAnswers(newAnswers);
    setLastAnswer(correct ? 'correct' : 'wrong');
    setTransitioning(true);

    setTimeout(() => {
      setLastAnswer(null);
      setTransitioning(false);
      if (callIndex < calls.length - 1) {
        setCallIndex(prev => prev + 1);
      } else {
        setScreen('review');
      }
    }, 700);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const totalPoints = correctCount * 10;
  const missedIndices = answers.map((a, i) => (!a.correct ? i : null)).filter(i => i !== null);

  // Must be before early returns — always call hooks unconditionally
  const currentScenario = calls[callIndex]?.scenario?.[lang] || calls[callIndex]?.scenario?.en || '';
  useScreenAudio(
    () => screen === 'playing' ? `${lang === 'es' ? 'Esta llamada es...' : 'This call is...'} ${currentScenario}` : '',
    [callIndex, lang, screen]
  );

  if (screen === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <BossReviewScreen
          emails={calls}
          answers={answers}
          onShowMissed={() => setScreen('missed')}
          onTryAgain={onRetry}
          onSkipToBadge={() => onComplete(totalPoints)}
        />
      </div>
    );
  }

  if (screen === 'missed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <BossMissedPhoneReview
          calls={calls}
          missedIndices={missedIndices}
          onDone={() => onComplete(totalPoints)}
        />
      </div>
    );
  }

  const callerName = current.callerName?.[lang] || current.callerName?.en || '';
  const scenario = currentScenario;

  return (
    <div className="flex flex-col items-center gap-4 px-5 py-3 w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">
          {lang === 'es' ? '🏆 Reto Final de Llamadas' : '🏆 Phone Boss Challenge'}
        </p>
        <p className="text-white/60 font-bold text-sm">
          {lang === 'es'
            ? `Llamada ${callIndex + 1} de ${calls.length}`
            : `Call ${callIndex + 1} of ${calls.length}`}
        </p>
        {/* Progress bar */}
        <div className="flex gap-1 mt-2 justify-center">
          {calls.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < answers.length
                  ? answers[i].correct ? 'w-5 bg-green-400' : 'w-5 bg-red-400'
                  : i === callIndex ? 'w-5 bg-gold' : 'w-5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Flash feedback overlay */}
      <AnimatePresence>
        {lastAnswer && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="text-7xl drop-shadow-2xl">
              {lastAnswer === 'correct' ? '✅' : '❌'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone call card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={callIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <PhoneCallBubble
            callerName={callerName}
            callerNumber={current.callerNumber}
            scenario={scenario}
          />
        </motion.div>
      </AnimatePresence>

      {/* Question */}
      <p className="text-white/80 font-semibold text-base text-center">
        {lang === 'es' ? 'Esta llamada es...' : 'This call is...'}
      </p>

      {/* REAL / SCAM buttons */}
      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={() => handleAnswer(false)}
          disabled={transitioning}
          className="flex-1 py-5 bg-green-500 text-white font-black text-2xl rounded-2xl shadow-lg hover:bg-green-400 active:scale-[0.97] transition-all border-4 border-green-400 disabled:opacity-50"
        >
          ✅ {lang === 'es' ? 'REAL' : 'REAL'}
        </button>
        <button
          onClick={() => handleAnswer(true)}
          disabled={transitioning}
          className="flex-1 py-5 bg-red-500 text-white font-black text-2xl rounded-2xl shadow-lg hover:bg-red-400 active:scale-[0.97] transition-all border-4 border-red-400 disabled:opacity-50"
        >
          🚨 {lang === 'es' ? 'FRAUDE' : 'SCAM'}
        </button>
      </div>
    </div>
  );
}