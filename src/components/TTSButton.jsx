import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTTS } from '@/lib/tts';

// Floating mute/unmute button — only visible when audio_narration is enabled
export default function TTSButton({ className = '' }) {
  const { enabled, muted, toggleMute } = useTTS();

  if (!enabled) return null;

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? 'Unmute Sage' : 'Mute Sage'}
      className={`flex items-center justify-center w-11 h-11 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 active:scale-95 transition-all ${className}`}
    >
      {muted
        ? <VolumeX className="w-5 h-5 text-white/70" />
        : <Volume2 className="w-5 h-5 text-white" />
      }
    </button>
  );
}