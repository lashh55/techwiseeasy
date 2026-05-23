import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Smartphone, Tablet } from 'lucide-react';

const devices = [
  { id: 'iphone', icon: Smartphone, emoji: '📱' },
  { id: 'android_phone', icon: Smartphone, emoji: '🤖' },
  { id: 'ipad', icon: Tablet, emoji: '📱' },
  { id: 'android_tablet', icon: Tablet, emoji: '📟' },
];

export default function ChooseDevice({ onNext, value, onChange }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(value || 'iphone');

  const handleSelect = (id) => {
    setSelected(id);
    onChange(id);
  };

  const labelMap = {
    iphone: t('iphone'),
    android_phone: t('android_phone'),
    ipad: t('ipad'),
    android_tablet: t('android_tablet'),
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-6 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center leading-snug mb-6"
      >
        {t('choose_device_title')}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {devices.map((device, i) => (
          <motion.button
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => handleSelect(device.id)}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-3 transition-all min-h-[120px] justify-center ${
              selected === device.id
                ? 'bg-gold/20 border-gold text-white shadow-lg'
                : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
            }`}
          >
            <span className="text-4xl">{device.emoji}</span>
            <span className="text-lg font-bold">{labelMap[device.id]}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-base text-white/70 text-center mt-4 font-medium">
        {t('change_in_settings')}
      </p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onNext}
        className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg mt-6 hover:bg-yellow-400 active:scale-[0.98] transition-all min-h-[68px]"
      >
        {t('thats_my_device')}
      </motion.button>
    </div>
  );
}