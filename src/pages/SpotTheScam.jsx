import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { useSyncTTS } from '@/hooks/useSyncTTS';
import { useScreenAudio } from '@/hooks/useScreenAudio';
import TTSButton from '@/components/TTSButton';
import { SORTED_SCAM_LEVELS as SCAM_LEVELS } from '@/lib/scamLevels';
import TextMessageBubble from '@/components/game/TextMessageBubble';
import EmailBubble from '@/components/game/EmailBubble';
import PhoneCallBubble from '@/components/game/PhoneCallBubble';
import ComputerPopupBubble from '@/components/game/ComputerPopupBubble';
import ComputerPopupButtonBubble from '@/components/game/ComputerPopupButtonBubble';
import FacebookPostBubble from '@/components/game/FacebookPostBubble';
import PrivateMessageThreadBubble from '@/components/game/PrivateMessageThreadBubble';
import EmailBossChallenge from '@/components/game/EmailBossChallenge';
import PhoneBossChallenge from '@/components/game/PhoneBossChallenge.jsx';
import PhoneBossChallengeComplete from '@/components/game/PhoneBossChallengeComplete.jsx';
import RedFlagSelector from '@/components/game/RedFlagSelector';
import RealReasons from '@/components/game/RealReasons';
import SageFeedback from '@/components/game/SageFeedback';
import SessionComplete from '@/components/game/SessionComplete';
import BossChallengeComplete from '@/components/game/BossChallengeComplete';
import BossReviewScreen from '@/components/game/BossReviewScreen.jsx';
import BossMissedReview from '@/components/game/BossMissedReview.jsx';

// Phase: 'question' | 'redflags' | 'realreasons' | 'feedback' | 'complete'

const isTestMode = typeof window !== 'undefined' && localStorage.getItem('twe_test_mode') === 'true';

// Derive a level's section key from its properties
function getLevelSection(level) {
  if (level.isBossChallenge) return 'text_boss';
  if (level.isEmailBossChallenge) return 'email_boss';
  if (level.isPhoneBossChallenge) return 'phone_boss';
  if (level.section) return level.section;
  // Fall back to displayOrder for text and email scams (no explicit section tag needed)
  const d = level.displayOrder;
  if (d >= 1 && d <= 5) return 'text';
  if (d >= 7 && d <= 11) return 'email';
  return 'text';
}

// Build a section → sorted levels map (excluding boss challenges) for counting
function buildSectionMap(allLevels) {
  const map = {};
  allLevels.forEach(lvl => {
    const sec = getLevelSection(lvl);
    if (!['text_boss','email_boss','phone_boss'].includes(sec)) {
      if (!map[sec]) map[sec] = [];
      map[sec].push(lvl);
    }
  });
  return map;
}

const SECTION_MAP = buildSectionMap(SCAM_LEVELS);

// Returns section label info for a given level
function getSectionLabel(level, lang) {
  const sec = getLevelSection(level);

  if (sec === 'text_boss') return { section: lang === 'es' ? '🏆 Reto Final de Texto' : '🏆 Text Scam Boss Challenge', sub: null };
  if (sec === 'email_boss') return { section: lang === 'es' ? '🏆 Reto Final de Correos' : '🏆 Email Boss Challenge', sub: null };
  if (sec === 'phone_boss') return { section: lang === 'es' ? '🏆 Reto Final de Llamadas' : '🏆 Phone Boss Challenge', sub: null };

  const sectionLevels = SECTION_MAP[sec] || [];
  const sectionIndex = sectionLevels.findIndex(l => l.id === level.id) + 1;
  const sectionTotal = sectionLevels.length;

  const sectionNames = {
    text:         lang === 'es' ? 'Estafa de Texto'            : 'Text Scam',
    email:        lang === 'es' ? 'Estafa de Correo'           : 'Email Scam',
    phone:        lang === 'es' ? 'Estafa Telefónica'          : 'Phone Scam',
    tech_support: lang === 'es' ? 'Estafa de Soporte Técnico'  : 'Tech-Support Scam',
    social_media: lang === 'es' ? 'Estafa en Redes Sociales'   : 'Social Media Scam',
    romance:      lang === 'es' ? 'Estafa Romántica'           : 'Romance Scam',
  };

  return {
    section: sectionNames[sec] || 'Quick Quiz',
    sectionIndex,
    sectionTotal,
  };
}

// Returns the appropriate question phrasing above the REAL/SCAM buttons
function getQuestionPhrase(level, lang) {
  const sec = getLevelSection(level);
  if (lang === 'es') {
    if (sec === 'phone') return 'Esta llamada es...';
    if (sec === 'tech_support') return 'Esta ventana emergente es...';
    if (sec === 'social_media') return 'Esta publicación es...';
    if (sec === 'romance') return 'Esto es...';
    if (sec === 'email') return 'Este correo es...';
    return 'Este mensaje es...';
  }
  if (sec === 'phone') return 'This call is...';
  if (sec === 'tech_support') return 'This pop-up is...';
  if (sec === 'social_media') return 'This post is...';
  if (sec === 'romance') return 'This is...';
  if (sec === 'email') return 'This email is...';
  return 'This message is...';
}

export default function SpotTheScam() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  useSyncTTS();

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
  const [bossAnswers, setBossAnswers] = useState([]); // track per-email correctness for review
  const [bossScreen, setBossScreen] = useState('complete'); // 'complete' | 'review' | 'missed'

  const level = SCAM_LEVELS[levelIndex];
  const isBoss = !!level.isBossChallenge;
  const isEmailBoss = !!level.isEmailBossChallenge;
  const isPhoneBoss = !!level.isPhoneBossChallenge;
  // For boss, use current sub-email; for regular, use level directly
  const activeLevel = isBoss ? level.emails[bossEmailIndex] : level;

  const sender = activeLevel.sender?.[lang] || activeLevel.sender?.en || '';
  const message = activeLevel.message?.[lang] || activeLevel.message?.en || '';
  const explanation = activeLevel.sageExplanation?.[lang] || activeLevel.sageExplanation?.en || '';

  // Narrate scenario text on question phase only (feedback phase is handled by SageFeedback)
  useScreenAudio(
    () => {
      if (phase !== 'question') return '';
      return activeLevel?.scenario?.[lang] || activeLevel?.scenario?.en
        || activeLevel?.message?.[lang] || activeLevel?.message?.en || '';
    },
    [levelIndex, phase, attempt, bossEmailIndex, lang]
  );

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
    // Record answer for boss review
    if (isBoss) setBossAnswers(prev => [...prev, { correct }]);
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
        setBossScreen('review');
      }
    } else {
      advanceLevel();
    }
  };

  const advanceLevel = async (extraPoints = 0) => {
    const pts = totalPoints + extraPoints;
    if (levelIndex < SCAM_LEVELS.length - 1) {
      if (extraPoints > 0) setTotalPoints(pts);
      setBossEmailIndex(0);
      setBossDone(false);
      setBossAnswers([]);
      setBossScreen('complete');
      setLevelIndex(prev => prev + 1);
      setPhase('question');
      setAttempt(1);
      setIsCorrect(false);
    } else {
      const records = await base44.entities.UserProgress.list();
      if (records && records.length > 0) {
        const current = records[0];
        await base44.entities.UserProgress.update(current.id, {
          wisdom_points: (current.wisdom_points || 0) + pts,
        });
      }
      setSessionDone(true);
    }
  };

  // Phone Boss Challenge — self-contained rapid-fire component
  if (isPhoneBoss) {
    if (bossDone) {
      return (
        <PhoneBossChallengeComplete
          totalPoints={bossPoints}
          onClaim={() => advanceLevel()}
        />
      );
    }
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={() => navigate('/game-menu')}
            className="flex items-center gap-1 text-white/80 hover:text-white min-h-[48px] min-w-[60px] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-lg font-semibold">{lang === 'es' ? 'Salir' : 'Exit'}</span>
          </button>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="text-gold font-black text-base">⭐ {totalPoints}</span>
          </div>
        </div>
        <PhoneBossChallenge
          key={`pbc-${levelIndex}-${attempt}`}
          level={level}
          onComplete={(pts) => {
            setBossDone(true);
            setBossPoints(pts || 0);
          }}
          onRetry={() => setAttempt(prev => prev + 1)}
        />
      </div>
    );
  }

  // Email Boss Challenge — self-contained rapid-fire component
  if (isEmailBoss) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
          <button
            onClick={() => navigate('/game-menu')}
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
            advanceLevel(pts || 0);
          }}
          onRetry={() => setAttempt(prev => prev + 1)}
        />
      </div>
    );
  }

  if (bossDone) {
    if (bossScreen === 'review') {
      return (
        <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
          <BossReviewScreen
            emails={level.emails}
            answers={bossAnswers}
            onShowMissed={() => setBossScreen('missed')}
            onTryAgain={() => {
              setBossEmailIndex(0);
              setBossAnswers([]);
              setBossPoints(0);
              setBossDone(false);
              setBossScreen('complete');
              setPhase('question');
              setAttempt(1);
              setIsCorrect(false);
            }}
            onSkipToBadge={() => advanceLevel()}
          />
        </div>
      );
    }
    if (bossScreen === 'missed') {
      const missedIndices = bossAnswers.map((a, i) => (!a.correct ? i : null)).filter(i => i !== null);
      return (
        <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col overflow-y-auto">
          <BossMissedReview
            emails={level.emails}
            missedIndices={missedIndices}
            onDone={() => advanceLevel()}
          />
        </div>
      );
    }
    return (
      <BossChallengeComplete
        totalPoints={bossPoints}
        onClaim={() => advanceLevel()}
      />
    );
  }

  if (sessionDone) {
    return (
      <SessionComplete
        totalPoints={totalPoints}
        maxPossiblePoints={maxPossiblePoints}
        levelCount={SCAM_LEVELS.length}
        onHome={() => navigate('/game-menu')}
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
          onClick={() => navigate('/game-menu')}
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

        <div className="flex items-center gap-2">
          <TTSButton />
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="text-gold font-black text-base">⭐ {totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Test-mode-only jump control */}
      {isTestMode && (
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
              setBossAnswers([]);
              setBossScreen('complete');
            }}
            className="bg-white/10 text-white text-xs font-bold rounded-lg px-2 py-1 border border-white/20 outline-none cursor-pointer"
          >
            {SCAM_LEVELS.map((lvl, i) => (
            <option key={i} value={i} className="bg-navy text-white">
              {lvl.displayOrder}. {lvl.isBossChallenge ? '🏆 Text Boss Challenge' : lvl.isEmailBossChallenge ? '🏆 Email Boss Challenge' : lvl.isPhoneBossChallenge ? '🏆 Phone Boss Challenge' : lvl.isPhoneCall ? `ID ${lvl.id} — ${lvl.callerName?.en || 'Phone Call'}` : lvl.isComputerPopupButton ? `ID ${lvl.id} — Fake Virus Link` : lvl.isComputerPopup ? `ID ${lvl.id} — Fake Virus Pop-Up` : lvl.isFacebookPost ? `ID ${lvl.id} — Facebook Giveaway` : lvl.isPrivateMessageThread ? `ID ${lvl.id} — Romance Scam` : `ID ${lvl.id} — ${lvl.sender?.en || ''}`}
            </option>
            ))}
          </select>
        </div>
      )}

      {/* Level label */}
      <div className="text-center px-6 pt-1 pb-2 flex-shrink-0">
        {(() => {
          const lbl = getSectionLabel(level, lang);
          if (isBoss) {
            return (
              <>
                <p className="text-gold font-black text-sm tracking-wide uppercase">{lbl.section}</p>
                <h2 className="text-white font-black text-lg leading-tight">
                  {lang === 'es' ? `Correo ${bossEmailIndex + 1} de ${level.emails.length}` : `Email ${bossEmailIndex + 1} of ${level.emails.length}`}
                </h2>
              </>
            );
          }
          return (
            <>
              <p className="text-gold font-black text-sm tracking-wide uppercase">
                {lbl.sectionTotal
                  ? `${lbl.section} ${lbl.sectionIndex} ${lang === 'es' ? 'de' : 'of'} ${lbl.sectionTotal}`
                  : lbl.section}
              </p>
              <h2 className="text-white font-black text-xl">
                {lang === 'es' ? '¿Real o Fraude?' : 'Real or Scam?'}
              </h2>
            </>
          );
        })()}
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
              {activeLevel.isPrivateMessageThread
                ? <PrivateMessageThreadBubble
                    contactName={activeLevel.contactName}
                    messages={activeLevel.messages}
                    scenario={activeLevel.scenario?.[lang] || activeLevel.scenario?.en}
                  />
                : activeLevel.isFacebookPost
                ? <FacebookPostBubble
                    pageName={activeLevel.pageName}
                    postText={activeLevel.postText}
                  />
                : activeLevel.isComputerPopupButton
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
                {getQuestionPhrase(activeLevel, lang)}
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