import React from 'react';
import { useLanguage } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ className = "" }) {
  const { t, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/30 transition-all min-h-[48px] ${className}`}
    >
      <Globe className="w-5 h-5" />
      <span>{t('language_label')}</span>
    </button>
  );
}