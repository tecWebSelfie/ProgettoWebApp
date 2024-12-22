import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppBar } from "../components/AppBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../components/ui/button";
import { TimeMachine } from "../components/TimeMachine";
import Apollo from "./Apollo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Apollo>
            <AppBar />
            <div>{children}</div>
            <div className="fixed bottom-5 left-5"></div>
          </Apollo>
        </ThemeProvider>
      </body>
    </html>
  );
}
