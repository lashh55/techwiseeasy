import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import { useTTS } from '@/lib/tts';

export default function SageFeedback({ isCorrect, explanation, onContinue, isScam, hasRedFlags }) {
  const { lang } = useLanguage();
  const { speak, stop } = useTTS();

  const correctMsg = lang === 'es'
    ? '¡Lo detectaste! Eso es exactamente correcto.'
    : 'You spotted it! That\'s exactly right.';
  const incorrectMsg = lang === 'es'
    ? 'No exactamente — pero por eso practicamos. Déjame explicarte...'
    : 'Not quite — but that\'s exactly why we practice. Let me explain...';

  useEffect(() => {
    const header = isCorrect ? correctMsg : incorrectMsg;
    speak(`${header} ${explanation}`, lang);
    return () => stop();
  }, []);

  const bgClass = isCorrect
    ? 'bg-gradient-to-b from-yellow-400 via-yellow-300 to-amber-200'
    : 'bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-between min-h-full px-6 py-8 ${bgClass}`}
    >
      <div className="text-5xl mt-4">{isCorrect ? '🌟' : '💙'}</div>

      <img src={IMAGES.sage_full} alt="Sage" className="w-40 h-48 object-contain drop-shadow-2xl" />

      {/* Speech bubble */}
      <div className="bg-white rounded-3xl p-5 shadow-lg w-full max-w-sm relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />
        <p className="font-black text-navy text-base mb-2 relative z-10">
          {isCorrect ? correctMsg : incorrectMsg}
        </p>
        <p className="text-navy/80 text-sm font-semibold leading-relaxed relative z-10">{explanation}</p>
      </div>

      <button
        onClick={onContinue}
        className={`w-full max-w-sm py-5 font-black text-xl rounded-2xl shadow-lg mt-4 active:scale-[0.98] transition-all min-h-[68px] ${
          isCorrect ? 'bg-navy text-gold hover:bg-navy/90' : 'bg-white text-navy hover:bg-gray-100'
        }`}
      >
        {lang === 'es' ? 'SIGUIENTE →' : 'NEXT →'}
      </button>
    </motion.div>
  );
}