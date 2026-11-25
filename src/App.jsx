import React, { useState, useEffect, useCallback } from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { themes, defaultThemeSlug } from './astryx-themes';
import KlipiLandingPage from './KlipiLandingPage';
import KlipiLandingPageAr from './KlipiLandingPageAr';
import ClipBountyApp from './ClipBountyApp';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [colorMode, setColorMode] = useState('dark');

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <Theme theme={themes[defaultThemeSlug]} mode={colorMode}>
      {route === '/demo' ? (
        <ClipBountyApp
          onNavigate={navigate}
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
      ) : route === '/ar' ? (
        <KlipiLandingPageAr
          onNavigate={navigate}
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
      ) : (
        <KlipiLandingPage
          onNavigate={navigate}
          colorMode={colorMode}
          onToggleColorMode={toggleColorMode}
        />
      )}
    </Theme>
  );
}
