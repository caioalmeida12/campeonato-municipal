"use client"

import "./globals.css";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthenticationProvider>
          {children}
        </AuthenticationProvider>
      </body>
    </html>
  );
}