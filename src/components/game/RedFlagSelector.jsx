import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

// All defined red flags are correct answers — users should select all of them.
export default function RedFlagSelector({ redFlags, sageExplanation, onContinue }) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const flags = redFlags[lang] || redFlags.en;
  const explanation = sageExplanation[lang] || sageExplanation.en;

  const toggleFlag = (i) => {
    if (confirmed) return;
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const handleConfirm = () => setConfirmed(true);

  const getStyle = (i) => {
    if (!confirmed) {
      return selected.includes(i)
        ? 'bg-red-500/20 border-red-400 text-white'
        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15';
    }
    // After confirm: all flags are correct — selected ones get green check, missed ones also get green
    const wasSelected = selected.includes(i);
    return 'bg-green-500/20 border-green-400 text-white';
  };

  const getIcon = (i) => {
    if (!confirmed) {
      return selected.includes(i) ? '🚩' : '◻️';
    }
    const wasSelected = selected.includes(i);
    // All are correct — selected = ✅, missed = ✅ (so user learns)
    // But if user selected something wrong... all flags ARE correct here, so just show ✅
    return '✅';
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <p className="text-white font-bold text-lg text-center">
        {lang === 'es' ? 'Selecciona las señales de alerta:' : 'Select the red flags:'}
      </p>

      <div className="flex flex-col gap-3">
        {flags.map((flag, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => toggleFlag(i)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${getStyle(i)}`}
          >
            <span className="text-2xl flex-shrink-0">{getIcon(i)}</span>
            <span className="text-base font-semibold">{flag}</span>
          </motion.button>
        ))}
      </div>

      {!confirmed && selected.length > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleConfirm}
          className="w-full py-4 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
        >
          {lang === 'es' ? 'CONFIRMAR →' : 'CONFIRM →'}
        </motion.button>
      )}

      {confirmed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Sage explanation — appears after reveal */}
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
            onClick={onContinue}
            className="w-full py-4 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
          >
            {lang === 'es' ? 'SIGUIENTE NIVEL →' : 'NEXT LEVEL →'}
          </button>
        </motion.div>
      )}
    </div>
  );
}