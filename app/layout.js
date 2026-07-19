import Script from "next/script";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap"
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap"
});

export const metadata = {
  metadataBase: new URL("https://hydroagentlab.com"),
  title: {
    default: "HydroAgent-Lab | Human-in-the-loop Flood Forecasting",
    template: "%s | HydroAgent-Lab"
  },
  description:
    "HydroAgent-Lab is a human-in-the-loop flood forecasting workflow system for auditable operational forecasting.",
  keywords: [
    "HydroAgent-Lab",
    "flood forecasting",
    "human-in-the-loop",
    "hydrology",
    "operational forecasting",
    "AI agent",
    "water resources"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/assets/hydroagent-mark.svg",
    shortcut: "/assets/hydroagent-mark.svg",
    apple: "/assets/hydroagent-mark.svg"
  },
  openGraph: {
    type: "website",
    siteName: "HydroAgent-Lab",
    title: "HydroAgent-Lab | Human-in-the-loop Flood Forecasting",
    description:
      "A human-in-the-loop flood forecasting workflow system for auditable operational forecasting.",
    url: "https://hydroagentlab.com",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "HydroAgent-Lab | Human-in-the-loop Flood Forecasting",
    description:
      "A human-in-the-loop flood forecasting workflow system for auditable operational forecasting."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <link rel="icon" href="/assets/hydroagent-mark.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6G0RNE8L4Z"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6G0RNE8L4Z');
          `}
        </Script>
      </body>
    </html>
  );
}
