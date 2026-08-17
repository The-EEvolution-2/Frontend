import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import LayoutWrapper from '../components/LayoutWrapper';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TimedLoginPromptModal from '../components/TimedLoginPromptModal';

export const metadata: Metadata = {
  title: 'EEvolution 2.0 - Monochrome Precision Archive',
  description: 'EEvolution 2.0 repository for electrical engineering specifications, papers, and admin data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@300;400;500;700&family=Hanken+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#F9F9F9] text-[#1A1C1C] dark:bg-[#121212] dark:text-[#F0F1F1] min-h-screen flex flex-col justify-between selection:bg-black selection:text-white" suppressHydrationWarning>
        <ReduxProvider>
          <LayoutWrapper>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <TimedLoginPromptModal />
            <Footer />
          </LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
