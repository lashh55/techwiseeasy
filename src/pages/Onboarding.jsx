import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';

import MeetSage from '@/components/onboarding/MeetSage';
import ChooseDevice from '@/components/onboarding/ChooseDevice';
import ChooseTextSize from '@/components/onboarding/ChooseTextSize';
import AudioNarration from '@/components/onboarding/AudioNarration';
import ZeroAds from '@/components/onboarding/ZeroAds';
import PrivacyPromise from '@/components/onboarding/PrivacyPromise';
import AvatarSelection from '@/components/onboarding/AvatarSelection';

export default function Onboarding() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [settings, setSettings] = useState({
    device_type: null,
    text_size: 'large',
    audio_narration: true,
    avatar_id: '',
    display_name: '',
    language: lang,
  });

  const totalSteps = 7; // 0-6 (Screen 2 through 8)

  const goNext = () => {
    if (step < totalSteps - 1) {
      setStep(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const finishOnboarding = async () => {
    await base44.entities.UserProgress.create({
      ...settings,
      language: lang,
      onboarding_complete: true,
      wisdom_points: 0,
      current_streak: 0,
      tutorial_complete: false,
    });
    navigate('/home');
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const steps = [
    <MeetSage key="meet" onNext={goNext} />,
    <ChooseDevice
      key="device"
      onNext={goNext}
      value={settings.device_type}
      onChange={(v) => updateSetting('device_type', v)}
    />,
    <ChooseTextSize
      key="textsize"
      onNext={goNext}
      value={settings.text_size}
      onChange={(v) => updateSetting('text_size', v)}
    />,
    <AudioNarration
      key="audio"
      onNext={goNext}
      value={settings.audio_narration}
      onChange={(v) => updateSetting('audio_narration', v)}
    />,
    <ZeroAds key="ads" onNext={goNext} />,
    <PrivacyPromise key="privacy" onNext={goNext} />,
    <AvatarSelection
      key="avatar"
      onNext={goNext}
      avatarValue={settings.avatar_id}
      nameValue={settings.display_name}
      onAvatarChange={(v) => updateSetting('avatar_id', v)}
      onNameChange={(v) => updateSetting('display_name', v)}
    />,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col relative overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 z-10">
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-white/80 hover:text-white min-w-[60px] min-h-[48px] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">{lang === 'en' ? 'Back' : 'Atrás'}</span>
        </button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-gold' : i < step ? 'w-2 bg-gold/60' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <LanguageToggle className="text-sm px-3 py-1.5" />
      </div>

      {/* Screen content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}