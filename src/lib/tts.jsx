import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TTSContext = createContext(null);

// Pick the best available female English voice
function pickVoice(lang) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const langCode = lang === 'es' ? 'es' : 'en';

  // Prefer natural-sounding female voices by name heuristics
  const femaleKeywords = ['samantha', 'karen', 'moira', 'fiona', 'victoria', 'zira', 'susan', 'female', 'woman', 'aria', 'jenny', 'siri'];
  const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langCode));

  // Try to find a named female voice
  const female = langVoices.find(v =>
    femaleKeywords.some(k => v.name.toLowerCase().includes(k))
  );
  if (female) return female;

  // Fallback: first US English voice
  const usVoice = langVoices.find(v => v.lang === (lang === 'es' ? 'es-US' : 'en-US'));
  if (usVoice) return usVoice;

  // Fallback: any matching lang voice
  if (langVoices.length) return langVoices[0];

  // Last resort: any voice
  return voices[0] || null;
}

export function TTSProvider({ children }) {
  // muted = user's temporary in-session toggle (does not save to DB)
  const [muted, setMuted] = useState(false);
  // enabled = from UserProgress.audio_narration
  const [enabled, setEnabled] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const langRef = useRef('en');

  // Load voices (Chrome loads them async)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const load = () => setVoicesReady(true);
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesReady(true);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', load);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback((text, lang) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (!enabled || muted) return;
    if (!text) return;

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;   // slightly slower — easier for seniors
    utterance.pitch = 1.05;
    utterance.volume = 1;

    const voice = pickVoice(lang || langRef.current);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }, [enabled, muted, voicesReady]);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev) {
        // muting — stop current playback
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      }
      return !prev;
    });
  }, []);

  // Update langRef when called
  const setLang = useCallback((l) => { langRef.current = l; }, []);

  return (
    <TTSContext.Provider value={{ enabled, setEnabled, muted, toggleMute, speak, stop, setLang }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const ctx = useContext(TTSContext);
  if (!ctx) throw new Error('useTTS must be used within TTSProvider');
  return ctx;
}