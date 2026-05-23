import React from 'react';
import { IMAGES } from '@/lib/images';
import { useLanguage } from '@/lib/i18n';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center p-6">
      <img src={IMAGES.sage_full} alt="Sage" className="w-32 h-36 object-contain mb-6" />
      <h1 className="text-3xl font-bold text-navy text-center">
        Welcome to TechWiseEasy!
      </h1>
      <p className="text-xl text-navy/70 text-center mt-3 font-medium">
        Home screen coming next — awaiting your approval.
      </p>
    </div>
  );
}