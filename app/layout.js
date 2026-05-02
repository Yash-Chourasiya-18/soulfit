import { AppProvider } from '../context/AppContext';
import LayoutWrapper from '../components/LayoutWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata = {
  title: 'Soul Fit – Threads That Connect Souls',
  description: 'Soul Fit – Premium clothing brand. Shop T-Shirts, Shirts, Pants, Cargos. Threads that connect souls.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=1200" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <AppProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <ToastContainer position="bottom-right" theme="dark" />
        </AppProvider>
      </body>
    </html>
  );
}
