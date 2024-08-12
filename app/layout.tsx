import { Toaster } from 'react-hot-toast';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import { theme } from 'theme';
import { socket } from './socket.mjs';

export const metadata = {
  title: process.env.APP_NAME,
};

export default function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
        />
      </head>

      <body className='flex flex-col min-h-screen'>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
        <Toaster position='top-center'></Toaster>
      </body>
    </html>
  );
}
