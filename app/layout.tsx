import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "A Team Chat Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('bg-white dark:bg-[#0E111F]',inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}  storageKey="discord-clone">
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
