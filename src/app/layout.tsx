import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import LayoutWrapper from '../components/LayoutWrapper';

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
      <body className="antialiased bg-[#FCFCF9] text-[#111111] dark:bg-[#121212] dark:text-[#E0E0E0] min-h-screen" suppressHydrationWarning>
        <ReduxProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
