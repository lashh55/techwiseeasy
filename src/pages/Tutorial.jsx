import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import { base44 } from '@/api/base44Client';

const tutorialSteps = [
  { titleKey: 'tutorial_step1_title', bodyKey: 'tutorial_step1_body', emoji: '👆' },
  { titleKey: 'tutorial_step2_title', bodyKey: 'tutorial_step2_body', emoji: '🦉' },
  { titleKey: 'tutorial_step3_title', bodyKey: 'tutorial_step3_body', emoji: '⭐' },
  { titleKey: 'tutorial_step4_title', bodyKey: 'tutorial_step4_body', emoji: '🔥' },
  { titleKey: 'tutorial_step5_title', bodyKey: 'tutorial_step5_body', emoji: '💜' },
];

export default function Tutorial() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const isLast = step === tutorialSteps.length - 1;

  const handleNext = async () => {
    if (isLast) {
      // Mark tutorial complete
      const records = await base44.entities.UserProgress.list();
      if (records && records.length > 0) {
        await base44.entities.UserProgress.update(records[0].id, {
          tutorial_complete: true,
        });
      }
      navigate('/home');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const current = tutorialSteps[step];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/home')}
          className="flex items-center gap-1 text-white/80 hover:text-white min-h-[48px] min-w-[60px] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">{t('back')}</span>
        </button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {tutorialSteps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-gold' : i < step ? 'w-2 bg-gold/60' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="min-w-[60px]" />
      </div>

      {/* Title */}
      <div className="text-center px-6 pt-4 pb-2">
        <h1 className="text-2xl font-black text-white">{t('tutorial_title')}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6 w-full max-w-sm"
          >
            {/* Sage + emoji card */}
            <div className="relative">
              <img src={IMAGES.sage_full} alt="Sage" className="w-48 h-56 object-contain drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 text-5xl">{current.emoji}</div>
            </div>

            {/* Speech bubble */}
            <div className="bg-white rounded-3xl p-6 shadow-lg w-full relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45" />
              <h2 className="text-xl font-black text-navy mb-2 relative z-10">{t(current.titleKey)}</h2>
              <p className="text-lg font-semibold text-navy/80 leading-relaxed relative z-10">{t(current.bodyKey)}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      <div className="px-6 pb-10">
        <button
          onClick={handleNext}
          className="w-full py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
        >
          {isLast ? t('tutorial_finish') : t('tutorial_next')}
        </button>
      </div>
    </div>
  );
}