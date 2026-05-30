import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { IMAGES } from '@/lib/images';

// Step components
import StoryStepAvatar from '@/components/story/StoryStepAvatar';
import StoryStepName from '@/components/story/StoryStepName';
import StoryStepProfession from '@/components/story/StoryStepProfession';
import StoryStepFamily from '@/components/story/StoryStepFamily';
import StoryStepLiving from '@/components/story/StoryStepLiving';
import StoryStepPet from '@/components/story/StoryStepPet';
import StoryStepConfirm from '@/components/story/StoryStepConfirm';

const TOTAL_STEPS = 7;

export default function StoryCharacterCreation() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showDay1Soon, setShowDay1Soon] = useState(false);

  const [character, setCharacter] = useState({
    avatar_id: null,
    name: '',
    profession: null,
    family: null,
    living: null,
    pet: null,
  });

  const update = (field, value) => setCharacter(prev => ({ ...prev, [field]: value }));

  const goNext = () => setStep(prev => prev + 1);
  const goBack = () => {
    if (step === 0) navigate('/game-menu');
    else setStep(prev => prev - 1);
  };

  const handleStartDay1 = async () => {
    setSaving(true);
    const records = await base44.entities.UserProgress.list();
    const data = {
      story_avatar_id: character.avatar_id || '',
      // Store empty string for skipped fields — storyDefaults.js provides fallbacks at render time
      story_name: character.name?.trim() || '',
      story_profession: character.profession || '',
      story_family: character.family || '',
      story_living: character.living || '',
      story_pet: (character.pet && character.pet !== 'Just me') ? character.pet : '',
      story_character_created: true,
    };
    if (records && records.length > 0) {
      await base44.entities.UserProgress.update(records[0].id, data);
    }
    setSaving(false);
    setShowDay1Soon(true);
  };

  const steps = [
    <StoryStepAvatar key="avatar" value={character.avatar_id} onSelect={id => update('avatar_id', id)} onNext={goNext} />,
    <StoryStepName key="name" value={character.name} onChange={v => update('name', v)} onNext={goNext} />,
    <StoryStepProfession key="profession" value={character.profession} onSelect={v => update('profession', v)} onNext={goNext} />,
    <StoryStepFamily key="family" value={character.family} onSelect={v => update('family', v)} onNext={goNext} />,
    <StoryStepLiving key="living" value={character.living} onSelect={v => update('living', v)} onNext={goNext} />,
    <StoryStepPet key="pet" value={character.pet} onSelect={v => update('pet', v)} onNext={goNext} />,
    <StoryStepConfirm key="confirm" character={character} onStart={handleStartDay1} onBack={goBack} saving={saving} />,
  ];

  if (showDay1Soon) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="text-7xl">🚧</div>
        <img src={IMAGES.sage_full} alt="Sage" className="w-28 h-36 object-contain" />
        <h1 className="text-3xl font-black text-gold">Day 1 is coming soon!</h1>
        <p className="text-white/80 font-semibold text-lg leading-relaxed max-w-sm">
          Your character is ready. Sage can't wait to walk you through your first day — check back soon!
        </p>
        <button
          onClick={() => navigate('/game-menu')}
          className="w-full max-w-sm py-5 bg-gold text-navy font-black text-xl rounded-2xl shadow-lg hover:bg-yellow-400 active:scale-[0.98] transition-all mt-2"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-brand-blue to-navy flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-white/80 hover:text-white min-w-[60px] min-h-[48px] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg font-semibold">Back</span>
        </button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
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

      {/* Step content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}