import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import StatsBar from '@/components/home/StatsBar';
import { useEffect } from 'react';

export default function GameMenu() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false); // eslint-disable-line no-unused-vars

  useEffect(() => {
    base44.entities.UserProgress.list().then(records => {
      if (records && records.length > 0) setProgress(records[0]);
    });
  }, []);

  const displayName = progress?.display_name || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center gap-4">
        <img src={IMAGES.sage_full} alt="Sage" className="w-16 h-20 object-contain drop-shadow-lg" />
        <div>
          <p className="text-white/80 text-lg font-semibold">
            {lang === 'es' ? 'Hola' : 'Hi'}{displayName ? `, ${displayName}` : ''}!
          </p>
          <h1 className="text-2xl font-black text-white leading-tight">
            {lang === 'es' ? '¿Qué quieres practicar hoy?' : 'What do you want to practice today?'}
          </h1>
        </div>
      </div>

      {/* Stats */}
      <StatsBar
        wisdomPoints={progress?.wisdom_points || 0}
        streak={progress?.current_streak || 0}
      />

      {/* Game cards */}
      <div className="flex flex-col gap-4 px-5 pt-6 pb-8">

        {/* Quick Quiz Card */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/spot-the-scam')}
          className="w-full text-left bg-white rounded-3xl shadow-xl overflow-hidden active:scale-[0.98] transition-transform"
        >
          <div className="bg-gradient-to-r from-red-500 to-orange-500 px-5 py-4 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            <div>
              <h2 className="text-white font-black text-2xl leading-tight">
                {lang === 'es' ? 'Quiz Rápido' : 'Quick Quiz'}
              </h2>
              <p className="text-white/90 font-semibold text-sm">
                {lang === 'es' ? 'Práctica rápida — 5 minutos.' : 'Fast scam practice — 5 minutes.'}
              </p>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-navy font-semibold text-base leading-snug flex-1 pr-4">
              {lang === 'es'
                ? 'Pon a prueba tus habilidades con desafíos rápidos de Real o Fraude.'
                : 'Test your scam-spotting skills with quick Real or Scam challenges.'}
            </p>
            <span className="text-3xl flex-shrink-0">▶️</span>
          </div>
        </motion.button>

        {/* Story Mode Card */}
        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/story-character-creation')}
          className="w-full text-left bg-white rounded-3xl shadow-xl overflow-hidden active:scale-[0.98] transition-transform"
        >
          <div className="bg-gradient-to-r from-sage-purple to-accent px-5 py-4 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <div>
              <h2 className="text-white font-black text-2xl leading-tight">
                {lang === 'es' ? 'Modo Historia' : 'Story Mode'}
              </h2>
              <p className="text-white/90 font-semibold text-sm">
                {lang === 'es'
                  ? 'Próximamente — vive un día, esquiva las estafas.'
                  : 'Coming soon — live a day, dodge the scams.'}
              </p>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <p className="text-navy font-semibold text-base leading-snug flex-1 pr-4">
              {lang === 'es'
                ? 'Camina por un día real en tu vida. Sage estará ahí si la necesitas.'
                : 'Walk through a real day in your shoes. Sage will be there if you need her.'}
            </p>
            <span className="text-3xl flex-shrink-0">🔒</span>
          </div>
        </motion.button>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="text-6xl mb-3">🚧</div>
              <img src={IMAGES.sage_full} alt="Sage" className="w-20 h-24 object-contain mx-auto mb-3" />
              <h2 className="text-navy font-black text-2xl mb-2">
                {lang === 'es' ? '¡Próximamente!' : 'Coming soon!'}
              </h2>
              <p className="text-gray-600 font-semibold text-base mb-6">
                {lang === 'es'
                  ? 'El Modo Historia ya está en camino. ¡Sage no puede esperar para acompañarte!'
                  : "Story Mode is on its way. Sage can't wait to walk alongside you!"}
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full py-4 bg-navy text-white font-black text-lg rounded-2xl hover:bg-brand-blue active:scale-[0.98] transition-all"
              >
                {lang === 'es' ? 'Volver al menú' : 'Back to menu'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}