import "./globals.css";

export const metadata = {
  title: "SeatCracker - Competitive Exam Practice Platform | Mock Tests & Performance Tracking",
  description: "SeatCracker is a smart practice platform for competitive exams like EAMCET, JEE, NEET and more. Practice topic-wise questions, take mock tests, track performance, and improve speed and accuracy.",
  keywords: "competitive exam practice, mock test platform, exam preparation app, EAMCET practice, JEE mock tests, NEET preparation, online test series, exam performance tracker",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SeatCracker - Smart Practice for Competitive Exams",
    description: "Multi-exam mock tests, topic-wise practice, and performance tracking.",
    images: ["/logo.png"],
    type: "website",
  },
  verification: {
    google: "BxFKr95rVYmyp0mlIJX3VZgxbenA1t6poYrDDgeqVFU",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

import { ThemeProvider } from "../components/ThemeProvider";
import GlobalHeader from "../components/GlobalHeader";
import GlobalPollBanner from "../components/polls/GlobalPollBanner";
import CookieBanner from "../components/CookieBanner";
import GlobalFooter from "../components/GlobalFooter";
import PolicyGuard from "../components/PolicyGuard";
import PresenceTracker from "../components/PresenceTracker";
import SeatCrackerChatbot from "../components/SeatCrackerChatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PresenceTracker />
          <PolicyGuard />
          <GlobalHeader />
          <GlobalPollBanner />
          <main style={{ minHeight: "100vh" }}>
            {children}
          </main>
          <CookieBanner />
          <GlobalFooter />
          {/* Custom CSS to fix invisible text */}
          <style dangerouslySetInnerHTML={{__html: `
            .chat-message-input,
            .chat-message-input textarea,
            .chat-message-input input,
            .chat-input,
            .chat-input textarea,
            .n8n-chat textarea,
            .n8n-chat input,
            .n8n-chat-input,
            .chat-window textarea,
            .chat-window input {
              color: #000000 !important;
              caret-color: #000000 !important;
              -webkit-text-fill-color: #000000 !important;
            }
          `}} />
          <SeatCrackerChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
