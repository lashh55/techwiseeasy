import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import EmailBubble from '@/components/game/EmailBubble';

// Rapid-fire email boss challenge — 10 emails, tap REAL or SCAM
// Pass threshold: 8/10 correct
export default function EmailBossChallenge({ level, onComplete, onRetry }) {
  const { lang } = useLanguage();
  const [emailIndex, setEmailIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { isScam (player answer), correct }
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null); // 'correct' | 'wrong'
  const [transitioning, setTransitioning] = useState(false);

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
        setShowResult(true);
      }
    }, 700);
  };

  const correctCount = answers.filter(a => a.correct).length;
  const passed = correctCount >= passingScore;
  const totalPoints = correctCount * 10;

  if (showResult) {
    return (
      <ResultScreen
        lang={lang}
        passed={passed}
        correctCount={correctCount}
        totalEmails={emails.length}
        totalPoints={totalPoints}
        onComplete={() => onComplete(totalPoints)}
        onRetry={onRetry}
      />
    );
  }

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
            <div className={`text-7xl drop-shadow-2xl ${lastAnswer === 'correct' ? '' : ''}`}>
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

function ResultScreen({ lang, passed, correctCount, totalEmails, totalPoints, onComplete, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center"
    >
      <div className="text-7xl mb-3">{passed ? '🏆' : '💪'}</div>

      <motion.img
        src={IMAGES.sage_full}
        alt="Sage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-32 h-40 object-contain mb-3"
      />

      <h1 className={`text-3xl font-black leading-tight mb-2 ${passed ? 'text-gold' : 'text-white'}`}>
        {passed
          ? (lang === 'es' ? '¡Experta en Correos!' : 'Email Expert!')
          : (lang === 'es' ? '¡Casi lo logras!' : 'Almost there!')}
      </h1>

      {/* Score */}
      <div className="bg-white/10 rounded-2xl px-8 py-4 mb-4 border border-white/20 w-full max-w-sm">
        <p className="text-white/60 font-bold text-sm mb-1">
          {lang === 'es' ? 'Resultado' : 'Score'}
        </p>
        <p className="text-4xl font-black text-gold">{correctCount} / {totalEmails}</p>
        {passed && (
          <p className="text-white/70 font-bold text-sm mt-1">+{totalPoints} {lang === 'es' ? 'puntos' : 'points'}</p>
        )}
      </div>

      {/* Sage message */}
      <div className="flex items-start gap-3 bg-white rounded-3xl p-4 shadow-lg w-full max-w-sm mb-6 text-left">
        <img src={IMAGES.sage_full} alt="Sage" className="w-12 h-16 object-contain flex-shrink-0" />
        <p className="text-navy text-sm font-semibold leading-relaxed">
          {passed
            ? (lang === 'es'
                ? '¡Impresionante! Tienes un ojo muy agudo para detectar correos falsos. ¡Sigue así!'
                : 'Impressive! You have a sharp eye for spotting fake emails. Keep it up!')
            : (lang === 'es'
                ? 'Te estás volviendo más aguda. Intentemos esa ronda una vez más — tú puedes lograrlo.'
                : "You're getting sharper. Let's try that round once more — you've got this.")}
        </p>
      </div>

      {passed ? (
        <>
          {/* Badge */}
          <div className="bg-gold/20 border-4 border-gold rounded-3xl px-8 py-4 mb-6 w-full max-w-sm flex flex-col items-center gap-1">
            <span className="text-5xl">📧</span>
            <p className="text-gold font-black text-base">
              {lang === 'es' ? 'Insignia: Experta en Correos' : 'Badge: Email Expert'}
            </p>
          </div>
          <button
            onClick={onComplete}
            className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-xl hover:bg-yellow-400 active:scale-[0.98] transition-all"
          >
            {lang === 'es' ? 'RECLAMAR MI INSIGNIA →' : 'CLAIM MY BADGE →'}
          </button>
        </>
      ) : (
        <button
          onClick={onRetry}
          className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-xl hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          {lang === 'es' ? 'INTENTAR DE NUEVO →' : 'TRY AGAIN →'}
        </button>
      )}
    </motion.div>
  );
}