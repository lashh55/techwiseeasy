import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { SORTED_SCAM_LEVELS as SCAM_LEVELS } from '@/lib/scamLevels';
import TextMessageBubble from '@/components/game/TextMessageBubble';
import EmailBubble from '@/components/game/EmailBubble';
import PhoneCallBubble from '@/components/game/PhoneCallBubble';
import ComputerPopupBubble from '@/components/game/ComputerPopupBubble';
import ComputerPopupButtonBubble from '@/components/game/ComputerPopupButtonBubble';
import EmailBossChallenge from '@/components/game/EmailBossChallenge';
import RedFlagSelector from '@/components/game/RedFlagSelector';
import RealReasons from '@/components/game/RealReasons';
import SageFeedback from '@/components/game/SageFeedback';
import SessionComplete from '@/components/game/SessionComplete';
import BossChallengeComplete from '@/components/game/BossChallengeComplete';

// Phase: 'question' | 'redflags' | 'realreasons' | 'feedback' | 'complete'

const isPreview = typeof window !== 'undefined' && window.self !== window.top;

export default function SpotTheScam() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [levelIndex, setLevelIndex] = useState(0);
  const [phase, setPhase] = useState('question');
  const [attempt, setAttempt] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPossiblePoints, setMaxPossiblePoints] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  // Boss challenge sub-state
  const [bossEmailIndex, setBossEmailIndex] = useState(0);
  const [bossDone, setBossDone] = useState(false);
  const [bossPoints, setBossPoints] = useState(0);

  const level = SCAM_LEVELS[levelIndex];
  const isBoss = !!level.isBossChallenge;
  const isEmailBoss = !!level.isEmailBossChallenge;
  // For boss, use current sub-email; for regular, use level directly
  const activeLevel = isBoss ? level.emails[bossEmailIndex] : level;
  const sender = activeLevel.sender?.[lang] || activeLevel.sender?.en || '';
  const message = activeLevel.message?.[lang] || activeLevel.message?.en || '';
  const explanation = activeLevel.sageExplanation?.[lang] || activeLevel.sageExplanation?.en || '';

  const handleAnswer = (tappedScam) => {
    const correct = tappedScam === activeLevel.isScam;
    setIsCorrect(correct);

    if (correct) {
      const pts = attempt === 1 ? 15 : 10;
      setTotalPoints(prev => prev + pts);
      setMaxPossiblePoints(prev => prev + pts);
      if (isBoss) setBossPoints(prev => prev + pts);
      if (activeLevel.isScam && activeLevel.redFlags) {
        setPhase('redflags');
      } else if (!activeLevel.isScam && activeLevel.realReasons) {
        setPhase('realreasons');
      } else {
        setPhase('feedback');
      }
    } else {
      setPhase('feedback');
    }
  };

  const handleFeedbackContinue = () => {
    if (!isCorrect && attempt === 1) {
      setAttempt(2);
      setPhase('question');
    } else {
      advanceEmail();
    }
  };

  const handleRedFlagsContinue = (flagPointsEarned, flagMaxPoints) => {
    setTotalPoints(prev => prev + flagPointsEarned);
    setMaxPossiblePoints(prev => prev + flagMaxPoints);
    if (isBoss) setBossPoints(prev => prev + flagPointsEarned);
    advanceEmail();
  };

  // Advance within boss sub-emails or to next top-level level
  const advanceEmail = () => {
    if (isBoss) {
      if (bossEmailIndex < level.emails.length - 1) {
        setBossEmailIndex(prev => prev + 1);
        setPhase('question');
        setAttempt(1);
        setIsCorrect(false);
      } else {
        setBossDone(true);
      }
    } else {
      advanceLevel();
    }
  };

  const advanceLevel = async () => {
    if (levelIndex < SCAM_LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
      setPhase('question');
      setAttempt(1);
      setIsCorrect(false);
    } else {
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

  // Email Boss Challenge — self-contained rapid-fire component
  if (isEmailBoss) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-1 text-white/80 hover:text-white min-h-[48px] min-w-[60px] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-lg font-semibold">{lang === 'es' ? 'Salir' : 'Exit'}</span>
          </button>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="text-gold font-black text-base">⭐ {totalPoints}</span>
          </div>
        </div>
        <EmailBossChallenge
          key={`ebc-${levelIndex}-${attempt}`}
          level={level}
          onComplete={(pts) => {
            setTotalPoints(prev => prev + (pts || 0));
            advanceLevel();
          }}
          onRetry={() => setAttempt(prev => prev + 1)}
        />
      </div>
    );
  }

  if (bossDone) {
    return (
      <BossChallengeComplete
        totalPoints={bossPoints}
        onClaim={advanceLevel}
      />
    );
  }

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

      {/* Preview-only jump control */}
      {isPreview && (
        <div className="flex items-center justify-center gap-2 px-4 pb-1">
          <span className="text-white/40 text-xs font-bold">🛠 Jump:</span>
          <select
            value={levelIndex}
            onChange={e => {
              const idx = Number(e.target.value);
              setLevelIndex(idx);
              setPhase('question');
              setAttempt(1);
              setIsCorrect(false);
              setBossEmailIndex(0);
              setBossDone(false);
            }}
            className="bg-white/10 text-white text-xs font-bold rounded-lg px-2 py-1 border border-white/20 outline-none cursor-pointer"
          >
            {SCAM_LEVELS.map((lvl, i) => (
            <option key={i} value={i} className="bg-navy text-white">
              {lvl.displayOrder}. {lvl.isBossChallenge ? '🏆 Boss Challenge' : lvl.isEmailBossChallenge ? '🏆 Email Boss Challenge' : lvl.isPhoneCall ? (lvl.id === 13 ? `ID ${lvl.id} — Social Security Call` : `ID ${lvl.id} — Grandparent Scam`) : lvl.isComputerPopupButton ? `ID ${lvl.id} — Fake Virus Link` : lvl.isComputerPopup ? `ID ${lvl.id} — Fake Virus Pop-Up` : `ID ${lvl.id} — ${lvl.sender?.en || ''}`}
            </option>
            ))}
          </select>
        </div>
      )}

      {/* Level label */}
      <div className="text-center px-6 pt-1 pb-2 flex-shrink-0">
        {isBoss ? (
          <>
            <p className="text-gold font-black text-sm tracking-wide uppercase">
              {lang === 'es' ? '🏆 Reto Final' : '🏆 Boss Challenge'}
            </p>
            <h2 className="text-white font-black text-lg leading-tight">
              {lang === 'es' ? `Correo ${bossEmailIndex + 1} de ${level.emails.length}` : `Email ${bossEmailIndex + 1} of ${level.emails.length}`}
            </h2>
          </>
        ) : (
          <>
            <p className="text-white/60 font-bold text-sm">
              {lang === 'es' ? `NIVEL ${levelIndex + 1} DE ${SCAM_LEVELS.length}` : `LEVEL ${levelIndex + 1} OF ${SCAM_LEVELS.length}`}
            </p>
            <h2 className="text-white font-black text-xl">
              {lang === 'es' ? '¿Real o Fraude?' : 'Real or Scam?'}
            </h2>
          </>
        )}
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
              {activeLevel.isComputerPopupButton
                ? <ComputerPopupButtonBubble
                    scenario={activeLevel.scenario?.[lang] || activeLevel.scenario?.en}
                  />
                : activeLevel.isComputerPopup
                ? <ComputerPopupBubble
                    scenario={activeLevel.scenario?.[lang] || activeLevel.scenario?.en}
                  />
                : activeLevel.isPhoneCall
                  ? <PhoneCallBubble
                      callerName={activeLevel.callerName?.[lang] || activeLevel.callerName?.en}
                      callerNumber={activeLevel.callerNumber}
                      scenario={activeLevel.scenario?.[lang] || activeLevel.scenario?.en}
                    />
                  : activeLevel.senderEmail
                    ? <EmailBubble senderName={sender} senderEmail={activeLevel.senderEmail} subject={activeLevel.subject?.[lang] || activeLevel.subject?.en} message={message} />
                    : <TextMessageBubble sender={sender} message={message} />
              }

              {/* Instructions */}
              <p className="text-white/80 font-semibold text-base text-center">
                {(activeLevel.isComputerPopup || activeLevel.isComputerPopupButton)
                  ? (lang === 'es' ? 'Esto es...' : 'This is...')
                  : activeLevel.isPhoneCall
                    ? (lang === 'es' ? 'Esta llamada es...' : 'This call is...')
                    : (lang === 'es' ? 'Este mensaje es...' : 'This message is...')
                }
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
                redFlags={activeLevel.redFlags}
                distractor={activeLevel.distractor || null}
                sageExplanation={activeLevel.sageExplanation}
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
                reasons={activeLevel.realReasons}
                sageExplanation={activeLevel.sageExplanation}
                onContinue={advanceEmail}
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