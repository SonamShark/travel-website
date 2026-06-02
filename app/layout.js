import "./globals.css";

export const metadata = {
  title: "Thubten Travels — Bhutan tailor-made holidays",
  description:
    "Tailor-made Bhutan holidays — cultural, spiritual, adventure, festival, wellness and luxury journeys with Thubten Tour and Travel.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
