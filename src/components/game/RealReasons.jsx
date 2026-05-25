import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

export default function RealReasons({ reasons, sageExplanation, onContinue }) {
  const { lang } = useLanguage();
  const reasonList = reasons[lang] || reasons.en;
  const explanation = sageExplanation[lang] || sageExplanation.en;

  return (
    <div className="flex flex-col items-center gap-5 px-5 py-4 w-full max-w-sm mx-auto">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-black text-xl text-center"
      >
        {lang === 'es' ? '¿Por qué es real?' : 'Why this is REAL:'}
      </motion.p>

      <div className="flex flex-col gap-3 w-full">
        {reasonList.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3 bg-green-500/20 border-2 border-green-400 rounded-2xl p-4"
          >
            <span className="text-2xl flex-shrink-0">✅</span>
            <span className="text-white font-semibold text-base">{reason}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3 bg-white rounded-3xl p-5 shadow-lg w-full"
      >
        <img src={IMAGES.sage_full} alt="Sage" className="w-16 h-20 object-contain flex-shrink-0" />
        <div>
          <p className="font-black text-navy text-sm mb-1">
            {lang === 'es' ? 'Lo que hay que buscar:' : 'What to look for:'}
          </p>
          <p className="text-navy text-sm font-semibold leading-relaxed">{explanation}</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onContinue}
        className="w-full py-4 bg-gold text-navy font-black text-lg rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all"
      >
        {lang === 'es' ? 'SIGUIENTE NIVEL →' : 'NEXT LEVEL →'}
      </motion.button>
    </div>
  );
}