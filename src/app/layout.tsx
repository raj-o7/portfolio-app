import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { RecruiterModeProvider } from "@/components/recruiter-mode-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.positioning,
  keywords: [
    profile.name,
    profile.title,
    "software developer portfolio",
    "full stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
  ],
  authors: [{ name: profile.name, url: profile.social.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.title}`,
    description: profile.positioning,
    siteName: `${profile.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.positioning,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.positioning,
  url: siteUrl,
  sameAs: [profile.social.github, profile.social.linkedin].filter((u) => !u.includes("[ADD")),
  email: profile.social.email,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${code.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <RecruiterModeProvider>
            <TooltipProvider delay={150}>{children}</TooltipProvider>
          </RecruiterModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
