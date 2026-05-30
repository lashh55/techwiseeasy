import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import EmailBubble from '@/components/game/EmailBubble';
import BossReviewScreen from '@/components/game/BossReviewScreen.jsx';
import BossMissedReview from '@/components/game/BossMissedReview.jsx';

// Rapid-fire email boss challenge — 10 emails, tap REAL or SCAM
// Pass threshold: 8/10 correct
// After round: BossReviewScreen → BossMissedReview (if opted) → badge screen (onComplete)
export default function EmailBossChallenge({ level, onComplete, onRetry }) {
  const { lang } = useLanguage();
  const [emailIndex, setEmailIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { tappedScam, correct }
  const [lastAnswer, setLastAnswer] = useState(null); // 'correct' | 'wrong'
  const [transitioning, setTransitioning] = useState(false);
  // 'playing' | 'review' | 'missed' | 'badge'
  const [screen, setScreen] = useState('playing');

  const emails = level.emails;
  const passingScore = level.passingScore || 8;
  const current = emails[emailIndex];

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
      if (emailIndex < emails.length - 1) {
        setEmailIndex(prev => prev + 1);
      } else {
        setScreen('review');
      }
    }, 700);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const totalPoints = correctCount * 10;
  const missedIndices = answers.map((a, i) => (!a.correct ? i : null)).filter(i => i !== null);

  // Review screen — offer three choices
  if (screen === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <BossReviewScreen
          emails={emails}
          answers={answers}
          onShowMissed={() => setScreen('missed')}
          onTryAgain={onRetry}
          onSkipToBadge={() => onComplete(totalPoints)}
        />
      </div>
    );
  }

  // Show each missed email with Sage explanation
  if (screen === 'missed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <BossMissedReview
          emails={emails}
          missedIndices={missedIndices}
          onDone={() => onComplete(totalPoints)}
        />
      </div>
    );
  }

  // Playing
  const sender = current.sender?.[lang] || current.sender?.en;
  const subject = current.subject?.[lang] || current.subject?.en;
  const message = current.message?.[lang] || current.message?.en;

  return (
    <div className="flex flex-col items-center gap-4 px-5 py-3 w-full">
      {/* Header */}
      <div className="text-center">
        <p className="text-gold font-black text-sm tracking-wide uppercase">
          {lang === 'es' ? '🏆 Reto Final de Correos' : '🏆 Email Boss Challenge'}
        </p>
        <p className="text-white/60 font-bold text-sm">
          {lang === 'es'
            ? `Correo ${emailIndex + 1} de ${emails.length}`
            : `Email ${emailIndex + 1} of ${emails.length}`}
        </p>
        {/* Progress bar */}
        <div className="flex gap-1 mt-2 justify-center">
          {emails.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < answers.length
                  ? answers[i].correct ? 'w-5 bg-green-400' : 'w-5 bg-red-400'
                  : i === emailIndex ? 'w-5 bg-gold' : 'w-5 bg-white/20'
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

      {/* Email card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={emailIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <EmailBubble
            senderName={sender}
            senderEmail={current.senderEmail}
            subject={subject}
            message={message}
          />
        </motion.div>
      </AnimatePresence>

      {/* Question */}
      <p className="text-white/80 font-semibold text-base text-center">
        {lang === 'es' ? 'Este correo es...' : 'This email is...'}
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