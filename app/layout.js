import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/hydroagent-mark.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
