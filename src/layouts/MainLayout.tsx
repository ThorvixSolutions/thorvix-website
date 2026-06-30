import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  onBookCall: () => void;
}

export function MainLayout({ children, onBookCall }: MainLayoutProps) {
  return (
    <>
      <Navbar onBookCall={onBookCall} />
      <main className="relative z-[2]">
        {children}
      </main>
      <Footer />
    </>
  );
}
