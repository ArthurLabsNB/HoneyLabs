'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function aceptarCookies() {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-xl bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-zinc-700 rounded-xl shadow-xl px-6 py-4 z-[9999] flex flex-col sm:flex-row items-center gap-4 animate-fade-scale">
      <div className="flex-1 text-sm text-zinc-800 dark:text-zinc-100">
        🍪 Este sitio utiliza cookies para ofrecerte la mejor experiencia. Al continuar, aceptas nuestra{' '}
        <a href="/legal/cookies" className="underline text-amber-700 dark:text-amber-300" target="_blank" rel="noopener">
          Política de Cookies
        </a>.
      </div>
      <button
        onClick={aceptarCookies}
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2 rounded-md shadow transition"
      >
        Aceptar
      </button>
    </div>
  );
}
