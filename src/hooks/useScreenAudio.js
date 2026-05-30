import { useEffect } from 'react';
import { useTTS } from '@/lib/tts';
import { useLanguage } from '@/lib/i18n';

/**
 * useScreenAudio(getText, deps)
 *
 * Narrates the result of getText() whenever deps change.
 * getText is called at effect time (not at hook definition time),
 * so it always reads fresh values.
 * Stops audio on unmount.
 *
 * Usage:
 *   useScreenAudio(() => `Hello ${name}`, [name]);
 */
export function useScreenAudio(getText, deps = []) {
  const { speak, stop } = useTTS();
  const { lang } = useLanguage();

  useEffect(() => {
    const text = typeof getText === 'function' ? getText() : getText;
    if (text) speak(text, lang);
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}