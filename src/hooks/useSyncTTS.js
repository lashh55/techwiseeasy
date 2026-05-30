import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useTTS } from '@/lib/tts';
import { useLanguage } from '@/lib/i18n';

// Call this once in any top-level page to sync audio_narration from UserProgress into TTS context
export function useSyncTTS() {
  const { setEnabled, setLang } = useTTS();
  const { lang } = useLanguage();

  useEffect(() => {
    setLang(lang);
  }, [lang]);

  useEffect(() => {
    base44.entities.UserProgress.list().then(records => {
      if (records && records.length > 0) {
        setEnabled(!!records[0].audio_narration);
      }
    });
  }, []);
}