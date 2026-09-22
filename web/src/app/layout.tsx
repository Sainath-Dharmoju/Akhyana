import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akhyana | Experience History",
  description: "Akhyana transforms Indian history into interactive learning experiences through stories, visual exploration, challenges, games and evidence-backed knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream text-oliveDeep font-sans">
        {children}
      </body>
    </html>
  );
}
