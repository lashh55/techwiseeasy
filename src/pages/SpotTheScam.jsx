import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { SCAM_LEVELS } from '@/lib/scamLevels';
import TextMessageBubble from '@/components/game/TextMessageBubble';
import EmailBubble from '@/components/game/EmailBubble';
import RedFlagSelector from '@/components/game/RedFlagSelector';
import RealReasons from '@/components/game/RealReasons';
import SageFeedback from '@/components/game/SageFeedback';
import SessionComplete from '@/components/game/SessionComplete';

// Phase: 'question' | 'redflags' | 'realreasons' | 'feedback' | 'complete'

export default function SpotTheScam() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [levelIndex, setLevelIndex] = useState(0);
  const [phase, setPhase] = useState('question');
  const [attempt, setAttempt] = useState(1); // 1 or 2
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const level = SCAM_LEVELS[levelIndex];
  const sender = level.sender[lang] || level.sender.en;
  const message = level.message[lang] || level.message.en;
  const explanation = level.sageExplanation[lang] || level.sageExplanation.en;

  const handleAnswer = (tappedScam) => {
    const correct = tappedScam === level.isScam;
    setIsCorrect(correct);

    if (correct) {
    const pts = attempt === 1 ? 15 : 10;
    setTotalPoints(prev => prev + pts);
    setMaxPossiblePoints(prev => prev + pts);
    if (level.isScam && level.redFlags) {
      setPhase('redflags');
    } else if (!level.isScam && level.realReasons) {
      setPhase('realreasons');
    } else {
      setPhase('feedback');
    }
    } else {
      // Wrong answer — show gentle feedback, no red flags yet
      setPhase('feedback');
    }
  };

  const handleFeedbackContinue = () => {
    if (!isCorrect && attempt === 1) {
      // Give them a second try
      setAttempt(2);
      setPhase('question');
    } else {
      advanceLevel();
    }
  };

  const handleRedFlagsContinue = (flagPointsEarned, flagMaxPoints) => {
    setTotalPoints(prev => prev + flagPointsEarned);
    setMaxPossiblePoints(prev => prev + flagMaxPoints);
    advanceLevel();
  };

  const advanceLevel = async () => {
    if (levelIndex < SCAM_LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
      setPhase('question');
      setAttempt(1);
      setIsCorrect(false);
    } else {
      // Session complete — save points
      const records = await base44.entities.UserProgress.list();
      if (records && records.length > 0) {
        const current = records[0];
        await base44.entities.UserProgress.update(current.id, {
          wisdom_points: (current.wisdom_points || 0) + totalPoints,
        });
      }
      setSessionDone(true);
    }
  };

  if (sessionDone) {
    return (
      <SessionComplete
        totalPoints={totalPoints}
        maxPossiblePoints={maxPossiblePoints}
        levelCount={SCAM_LEVELS.length}
        onHome={() => navigate('/home')}
        onReplay={() => {
          setLevelIndex(0);
          setPhase('question');
          setAttempt(1);
          setIsCorrect(false);
          setTotalPoints(0);
          setMaxPossiblePoints(0);
          setSessionDone(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-1 text-white/80 hover:text-white min-h-[48px] min-w-[60px] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">{lang === 'es' ? 'Salir' : 'Exit'}</span>
        </button>

        {/* Progress */}
        <div className="flex gap-2">
          {SCAM_LEVELS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === levelIndex ? 'w-8 bg-gold' : i < levelIndex ? 'w-2 bg-gold/60' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
          <span className="text-gold font-black text-base">⭐ {totalPoints}</span>
        </div>
      </div>

      {/* Level label */}
      <div className="text-center px-6 pt-1 pb-2 flex-shrink-0">
        <p className="text-white/60 font-bold text-sm">
          {lang === 'es' ? `NIVEL ${levelIndex + 1} DE ${SCAM_LEVELS.length}` : `LEVEL ${levelIndex + 1} OF ${SCAM_LEVELS.length}`}
        </p>
        <h2 className="text-white font-black text-xl">
          {lang === 'es' ? '¿Real o Fraude?' : 'Real or Scam?'}
        </h2>
        {attempt === 2 && (
          <p className="text-yellow-300 font-bold text-sm mt-0.5">
            {lang === 'es' ? '¡Intento 2! Piénsalo bien...' : 'Try 2! Think it through...'}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === 'question' && (
            <motion.div
              key={`q-${levelIndex}-${attempt}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-5 px-5 py-4"
            >
              {level.senderEmail
                ? <EmailBubble senderName={sender} senderEmail={level.senderEmail} subject={level.subject?.[lang] || level.subject?.en} message={message} />
                : <TextMessageBubble sender={sender} message={message} />
              }

              {/* Instructions */}
              <p className="text-white/80 font-semibold text-base text-center">
                {lang === 'es' ? 'Este mensaje es...' : 'This message is...'}
              </p>

              {/* REAL / SCAM buttons */}
              <div className="flex gap-4 w-full max-w-sm">
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 py-5 bg-green-500 text-white font-black text-2xl rounded-2xl shadow-lg hover:bg-green-400 active:scale-[0.97] transition-all border-4 border-green-400"
                >
                  ✅ {lang === 'es' ? 'REAL' : 'REAL'}
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 py-5 bg-red-500 text-white font-black text-2xl rounded-2xl shadow-lg hover:bg-red-400 active:scale-[0.97] transition-all border-4 border-red-400"
                >
                  🚨 {lang === 'es' ? 'FRAUDE' : 'SCAM'}
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'redflags' && (
            <motion.div
              key={`rf-${levelIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 px-5 py-4"
            >
              <RedFlagSelector
                redFlags={level.redFlags}
                distractor={level.distractor || null}
                sageExplanation={level.sageExplanation}
                onContinue={handleRedFlagsContinue}
              />
            </motion.div>
          )}

          {phase === 'realreasons' && (
            <motion.div
              key={`rr-${levelIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 px-5 py-4"
            >
              <RealReasons
                reasons={level.realReasons}
                sageExplanation={level.sageExplanation}
                onContinue={advanceLevel}
              />
            </motion.div>
          )}

          {phase === 'feedback' && (
            <motion.div
              key={`fb-${levelIndex}-${attempt}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <SageFeedback
                isCorrect={isCorrect}
                explanation={explanation}
                onContinue={handleFeedbackContinue}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}