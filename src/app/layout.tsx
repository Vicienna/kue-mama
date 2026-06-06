import './globals.css';
import { CartProvider } from '@/hooks/useCart';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}