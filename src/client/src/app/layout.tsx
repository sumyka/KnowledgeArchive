import type { Metadata } from 'next';
import './globals.css';
import Header from './_components/Header';

export const metadata: Metadata = {
  title: 'Knowledge Archive',
  description: 'Enter the ISBN to add the book title and cover to your bookshelf!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning={true} className="bg-gray-50 text-gray-900">
        <Header />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
