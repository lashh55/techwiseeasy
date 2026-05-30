import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const TTSContext = createContext(null);

// Browser-side blob URL cache: text → blobUrl (persists across re-renders, freed on page reload)
const blobCache = new Map();

// Convert base64 string to a blob URL for audio playback
function base64ToAudioUrl(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const blob = new Blob([bytes], { type: 'audio/mpeg' });
  return URL.createObjectURL(blob);
}

export function TTSProvider({ children }) {
  const [muted, setMuted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const mutedRef = useRef(false);
  const currentAudioRef = useRef(null);
  const langRef = useRef('en');

  const setEnabled_ = useCallback((val) => {
    enabledRef.current = val;
    setEnabled(val);
  }, []);

  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  }, []);

  const speak = useCallback(async (text) => {
    if (!enabledRef.current || mutedRef.current) return;
    if (!text || !text.trim()) return;

    // Stop any currently playing audio immediately
    stop();

    const cacheKey = text.trim().slice(0, 500);

    try {
      let blobUrl;

      if (blobCache.has(cacheKey)) {
        blobUrl = blobCache.get(cacheKey);
      } else {
        const response = await base44.functions.invoke('ttsSpeak', { text: text.trim() });
        const { audio } = response.data;
        if (!audio) return;

        blobUrl = base64ToAudioUrl(audio);

        // Cache up to 150 entries
        if (blobCache.size < 150) {
          blobCache.set(cacheKey, blobUrl);
        }
      }

      // Re-check mute state after async gap
      if (mutedRef.current || !enabledRef.current) return;

      const audio = new Audio(blobUrl);
      currentAudioRef.current = audio;
      audio.onended = () => { if (currentAudioRef.current === audio) currentAudioRef.current = null; };
      audio.onerror = () => { if (currentAudioRef.current === audio) currentAudioRef.current = null; };
      await audio.play();
    } catch (_err) {
      // Silently fail — audio is an enhancement, not a blocker
      currentAudioRef.current = null;
    }
  }, [stop]);

  const setLang = useCallback((l) => {
    langRef.current = l;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      mutedRef.current = next;
      if (next) stop();
      return next;
    });
  }, [stop]);

  return (
    <TTSContext.Provider value={{
      enabled,
      setEnabled: setEnabled_,
      muted,
      toggleMute,
      speak,
      stop,
      setLang,
    }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const ctx = useContext(TTSContext);
  if (!ctx) throw new Error('useTTS must be used within TTSProvider');
  return ctx;
}