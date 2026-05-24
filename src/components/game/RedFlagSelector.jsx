import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

// redFlags: { en: [...], es: [...] }  — all correct answers
// distractor: { en: string, es: string } | null — one wrong item, shuffled in
// onContinue(pointsEarned, maxPoints) — scoring: +5 correct, -3 wrong distractor, +10 bonus
export default function RedFlagSelector({ redFlags, distractor, sageExplanation, onContinue }) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const flags = redFlags[lang] || redFlags.en;
  const distractorText = distractor ? (distractor[lang] || distractor.en) : null;
  const explanation = sageExplanation[lang] || sageExplanation.en;

  // Build shuffled item list: each item has { text, isCorrect, originalIndex }
  const items = useMemo(() => {
    const correctItems = flags.map((text, i) => ({ text, isCorrect: true, id: `c${i}` }));
    if (distractorText) {
      // Insert distractor at a stable random-ish position (middle-ish)
      const insertAt = Math.floor(correctItems.length / 2);
      correctItems.splice(insertAt, 0, { text: distractorText, isCorrect: false, id: 'distractor' });
    }
    return correctItems;
  }, [flags, distractorText]);

  const toggleItem = (id) => {
    if (confirmed) return;
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleConfirm = () => setConfirmed(true);

  const getStyle = (item) => {
    if (!confirmed) {
      return selected.includes(item.id)
        ? 'bg-white/20 border-white/60 text-white'
        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15';
    }
    if (item.isCorrect) {
      return selected.includes(item.id)
        ? 'bg-green-500/20 border-green-400 text-white'       // correctly selected
        : 'bg-yellow-500/10 border-yellow-400 text-white/90'; // missed
    }
    // Distractor
    return selected.includes(item.id)
      ? 'bg-red-500/20 border-red-400 text-white'  // wrongly selected
      : 'bg-white/5 border-white/10 text-white/50'; // not selected — fade out
  };

  const getIcon = (item) => {
    if (!confirmed) return selected.includes(item.id) ? '🚩' : '◻️';
    if (item.isCorrect) {
      return selected.includes(item.id) ? '✅' : '👆';
    }
    // Distractor
    return selected.includes(item.id) ? '❌' : '◻️';
  };

  const missedLabel = lang === 'es' ? 'Perdiste este' : 'You missed this one';
  const wrongLabel = lang === 'es' ? 'Esto no es una señal de alerta (-3 pts)' : 'This is not a red flag (-3 pts)';

  // Scoring
  const correctCount = items.filter(it => it.isCorrect && selected.includes(it.id)).length;
  const wrongCount = items.filter(it => !it.isCorrect && selected.includes(it.id)).length;
  const totalCorrectFlags = items.filter(it => it.isCorrect).length;
  const bonusPoints = 10;
  const pointsEarned = Math.max(0, correctCount * 5 - wrongCount * 3) + bonusPoints;
  const maxPoints = totalCorrectFlags * 5 + bonusPoints;

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <p className="text-white font-bold text-lg text-center">
        {lang === 'es' ? 'Selecciona todas las señales de alerta:' : 'Select all the red flags:'}
      </p>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${getStyle(item)}`}
          >
            <span className="text-2xl flex-shrink-0">{getIcon(item)}</span>
            <div className="flex flex-col">
              <span className="text-base font-semibold">{item.text}</span>
              {confirmed && item.isCorrect && !selected.includes(item.id) && (
                <span className="text-yellow-300 text-xs font-bold mt-0.5">{missedLabel}</span>
              )}
              {confirmed && !item.isCorrect && selected.includes(item.id) && (
                <span className="text-red-300 text-xs font-bold mt-0.5">{wrongLabel}</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {!confirmed && (
        <>
          {selected.length === 0 && (
            <p className="text-white/60 text-sm font-bold text-center">
              {lang === 'es' ? 'Toca al menos una opción para continuar' : 'Tap at least one option to continue'}
            </p>
          )}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => { if (selected.length > 0) handleConfirm(); }}
            className={`w-full py-4 font-black text-lg rounded-2xl shadow-lg transition-all ${
              selected.length > 0
                ? 'bg-gold text-navy hover:bg-yellow-400 active:scale-[0.98]'
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
          >
            {lang === 'es' ? 'CONFIRMAR →' : 'CONFIRM →'}
          </motion.button>
        </>
      )}

      {confirmed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Points breakdown */}
          <div className="w-full bg-white/10 rounded-2xl px-4 py-3 flex justify-between items-center">
            <span className="text-white/80 font-bold text-sm">
              {lang === 'es' ? 'Puntos ganados:' : 'Points earned:'}
            </span>
            <span className="text-gold font-black text-xl">+{pointsEarned}</span>
          </div>

          {/* Sage explanation */}
          <div className="flex items-start gap-3 bg-white rounded-3xl p-5 shadow-lg w-full">
            <img src={IMAGES.sage_full} alt="Sage" className="w-16 h-20 object-contain flex-shrink-0" />
            <div>
              <p className="font-black text-navy text-sm mb-1">
                {lang === 'es' ? 'Aquí está lo que hay que buscar:' : 'Here is what to look for:'}
              </p>
              <p className="text-navy text-sm font-semibold leading-relaxed">{explanation}</p>
            </div>
          </div>

          <button
            onClick={() => onContinue(pointsEarned, maxPoints)}
            className="w-full py-4 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
          >
            {lang === 'es' ? 'SIGUIENTE NIVEL →' : 'NEXT LEVEL →'}
          </button>
        </motion.div>
      )}
    </div>
  );
}