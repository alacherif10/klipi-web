import React, { useState, useEffect } from 'react';
import KlipiLandingPage from './KlipiLandingPage';
import ClipBountyApp from './ClipBountyApp';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (route === '/demo') {
    return <ClipBountyApp />;
  }

  return <KlipiLandingPage />;
}