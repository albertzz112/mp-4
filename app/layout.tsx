import './globals.css';
import Header from './Header';
import { ReactNode, Suspense } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
        </body>
        </html>
    );
}
