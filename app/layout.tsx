import { ThemeProvider } from "@/components/common/theme-provider";
import { assetPath, profile } from "@/config/portfolio";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | Portofolio Magang`,
  description: profile.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | Portofolio Magang`,
    description: profile.description,
    type: "website",
    locale: "id_ID",
    siteName: "Portofolio Verlita",
  },
  icons: { icon: assetPath("/icon.svg") },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
