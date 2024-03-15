"use client"

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

import "./globals.css";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext";
import Navbar from '@/containers/Navbar/Navbar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthenticationProvider>
              <Navbar />
              {children}
            </AuthenticationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}