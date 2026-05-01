"use client";

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AIChatBot from '../components/AIChatBot';
import GlobalUI from '../components/GlobalUI';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <main id="app-root">
        {children}
      </main>
    );
  }

  return (
    <>
      <GlobalUI />
      <Header />
      <main id="app-root">
        {children}
      </main>
      <Footer />
      <AIChatBot />
    </>
  );
}
