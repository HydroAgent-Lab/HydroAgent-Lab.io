import "./globals.css";

export const metadata = {
  title: "HydroAgent-Lab",
  description:
    "HydroAgent-Lab is a human-in-the-loop flood forecasting workflow system for auditable operational forecasting.",
  icons: {
    icon: "/assets/hydroagent-mark.svg",
    shortcut: "/assets/hydroagent-mark.svg",
    apple: "/assets/hydroagent-mark.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/hero-hydroagent-lab-fast.webp" />
        <link rel="icon" href="/assets/hydroagent-mark.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
