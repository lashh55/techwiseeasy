import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';
import EmailBubble from '@/components/game/EmailBubble';

export default function BossMissedReview({ emails, missedIndices, onDone }) {
  const { lang } = useLanguage();
  const [pos, setPos] = useState(0);

  if (missedIndices.length === 0) {
    onDone();
    return null;
  }

  const currentIdx = missedIndices[pos];
  const email = emails[currentIdx];
  const isLast = pos === missedIndices.length - 1;

  const sender = email.sender?.[lang] || email.sender?.en || '';
  const subject = email.subject?.[lang] || email.subject?.en || '';
  const message = email.message?.[lang] || email.message?.en || '';
  const explanation = email.sageExplanation?.[lang] || email.sageExplanation?.en || '';

  const verdict = email.isScam
    ? (lang === 'es' ? '🚨 Esto era un FRAUDE' : '🚨 This was a SCAM')
    : (lang === 'es' ? '✅ Esto era REAL' : '✅ This was REAL');

  return (
    <div className="flex flex-col items-center px-5 py-4 gap-4 w-full overflow-y-auto">
      <div className="text-center">
        <p className="text-gold font-black text-xs tracking-wide uppercase">
          {lang === 'es' ? `Revisando fallo ${pos + 1} de ${missedIndices.length}` : `Reviewing miss ${pos + 1} of ${missedIndices.length}`}
        </p>
        <p className="text-white/60 font-bold text-sm">
          {lang === 'es' ? `Pregunta ${currentIdx + 1}` : `Question ${currentIdx + 1}`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pos}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="w-full flex flex-col gap-4"
        >
          <EmailBubble
            senderName={sender}
            senderEmail={email.senderEmail}
            subject={subject}
            message={message}
          />

          <div className={`w-full rounded-2xl px-5 py-3 text-center font-black text-lg ${
            email.isScam ? 'bg-red-500/20 border-2 border-red-400 text-red-200' : 'bg-green-500/20 border-2 border-green-400 text-green-200'
          }`}>
            {verdict}
          </div>

          {explanation && (
            <div className="flex items-start gap-3 bg-white rounded-3xl p-4 shadow-lg w-full">
              <img src={IMAGES.sage_full} alt="Sage" className="w-10 h-14 object-contain flex-shrink-0" />
              <p className="text-navy text-sm font-semibold leading-relaxed">{explanation}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => { if (isLast) onDone(); else setPos(p => p + 1); }}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all mt-2"
      >
        {isLast
          ? (lang === 'es' ? 'RECLAMAR MI INSIGNIA →' : 'CLAIM MY BADGE →')
          : (lang === 'es' ? 'Siguiente →' : 'Next →')}
      </button>
    </div>
  );
}