import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/i18n';
import { TTSProvider } from '@/lib/tts';

import Welcome from '@/pages/Welcome';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import GameMenu from '@/pages/GameMenu';
import StoryCharacterCreation from '@/pages/StoryCharacterCreation';
import Tutorial from '@/pages/Tutorial';
import SpotTheScam from '@/pages/SpotTheScam';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <TTSProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/home" element={<Home />} />
              <Route path="/game-menu" element={<GameMenu />} />
              <Route path="/story-character-creation" element={<StoryCharacterCreation />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/spot-the-scam" element={<SpotTheScam />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </LanguageProvider>
      </TTSProvider>
    </QueryClientProvider>
  )
}

export default App