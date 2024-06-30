import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import '@/styles/tailwind.css';

export const metadata = {
  title: 'Richard Westmoreland',
  description: 'Software engineer, writer, and creator of things.',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
