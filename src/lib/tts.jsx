import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TTSContext = createContext(null);

// Quality-first voice picker matching the specified priority order
function pickVoice(voices, lang) {
  if (!voices || !voices.length) return null;

  const isEs = lang === 'es';
  const targetLang = isEs ? 'es' : 'en';

  // Priority keywords — higher-quality voices on modern browsers/OS
  const qualityKeywords = ['natural', 'online', 'enhanced', 'premium', 'neural', 'aria', 'jenny', 'samantha', 'allison', 'microsoft'];
  // Female name heuristics as secondary filter
  const femaleKeywords = ['samantha', 'karen', 'moira', 'fiona', 'victoria', 'zira', 'susan', 'female', 'woman', 'aria', 'jenny', 'allison', 'siri', 'ava', 'kate', 'nicky', 'tessa', 'serena'];

  const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(targetLang));
  const enUSVoices = voices.filter(v => v.lang.toLowerCase() === (isEs ? 'es-us' : 'en-us'));

  // 1. High-quality female en-US voice
  const bestFemale = enUSVoices.find(v => {
    const name = v.name.toLowerCase();
    return qualityKeywords.some(k => name.includes(k)) && femaleKeywords.some(k => name.includes(k));
  });
  if (bestFemale) return bestFemale;

  // 2. Any high-quality en-US voice (may be female)
  const bestEnUS = enUSVoices.find(v => qualityKeywords.some(k => v.name.toLowerCase().includes(k)));
  if (bestEnUS) return bestEnUS;

  // 3. Any high-quality voice in the target language
  const bestLang = langVoices.find(v => qualityKeywords.some(k => v.name.toLowerCase().includes(k)));
  if (bestLang) return bestLang;

  // 4. Any female en-US voice
  const anyFemaleEnUS = enUSVoices.find(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
  if (anyFemaleEnUS) return anyFemaleEnUS;

  // 5. Any en-US voice
  if (enUSVoices.length) return enUSVoices[0];

  // 6. Any voice in target language
  if (langVoices.length) return langVoices[0];

  // 7. Absolute fallback
  return voices[0] || null;
}

export function TTSProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  // Store selected voice object once voices load
  const voiceRef = useRef(null);
  const langRef = useRef('en');
  const enabledRef = useRef(false);
  const mutedRef = useRef(false);

  // Keep refs in sync so speak() never has stale closure values
  useEffect(() => { enabledRef.current = enabled; }, [enabled]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  // Load voices — Chrome fires voiceschanged asynchronously
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const selectVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        voiceRef.current = pickVoice(voices, langRef.current);
      }
    };

    selectVoice();
    window.speechSynthesis.addEventListener('voiceschanged', selectVoice);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', selectVoice);
  }, []);

  // Re-select voice when language changes
  const setLang = useCallback((l) => {
    langRef.current = l;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) voiceRef.current = pickVoice(voices, l);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  }, []);

  // speak is stable — reads enabled/muted from refs, not closure state
  const speak = useCallback((text, lang) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (!enabledRef.current || mutedRef.current) return;
    if (!text || !text.trim()) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Pick voice for this language if different from current
    let voice = voiceRef.current;
    if (lang && lang !== langRef.current) {
      const voices = window.speechSynthesis.getVoices();
      voice = pickVoice(voices, lang) || voice;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;    // natural pace, comfortable for seniors
    utterance.pitch = 1.0;
    utterance.volume = 1;
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }, []); // stable — no deps needed because we use refs

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return !prev;
    });
  }, []);

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