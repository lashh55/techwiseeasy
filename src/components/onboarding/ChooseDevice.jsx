import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { IMAGES } from '@/lib/images';

const devices = [
  { id: 'iphone', image: IMAGES.device_iphone },
  { id: 'android_phone', image: IMAGES.device_android_phone },
  { id: 'ipad', image: IMAGES.device_ipad },
  { id: 'android_tablet', image: IMAGES.device_android_tablet },
];

export default function ChooseDevice({ onNext, value, onChange }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(value || null);

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
            className={`flex flex-col items-center rounded-2xl border-3 transition-all overflow-hidden min-h-[140px] justify-center ${
              selected === device.id
                ? 'border-gold shadow-lg scale-105'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <img src={device.image} alt={labelMap[device.id]} className="w-full h-28 object-cover" />
            <div className={`w-full py-2 text-center text-base font-bold ${
              selected === device.id ? 'bg-gold text-navy' : 'bg-white/10 text-white'
            }`}>
              {labelMap[device.id]}
            </div>
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
        onClick={() => { if (selected) onNext(); }}
        className={`w-full max-w-sm py-5 font-black text-xl rounded-2xl shadow-lg mt-6 transition-all min-h-[68px] ${
          selected
            ? 'bg-gold text-navy hover:bg-yellow-400 active:scale-[0.98]'
            : 'bg-white/20 text-white/40 cursor-not-allowed'
        }`}
      >
        {t('thats_my_device')}
      </motion.button>
    </div>
  );
}