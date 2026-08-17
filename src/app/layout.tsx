import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import LayoutWrapper from '../components/LayoutWrapper';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TimedLoginPromptModal from '../components/TimedLoginPromptModal';

export const metadata: Metadata = {
  title: 'EEvolution 2.0 - Academic & Technical Archive',
  description: 'EEvolution 2.0 repository for electrical engineering specifications, papers, and admin data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#FCFCF9] text-[#111111] dark:bg-[#121212] dark:text-[#E0E0E0] min-h-screen flex flex-col justify-between" suppressHydrationWarning>
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
