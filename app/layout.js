export const metadata = {
  title: "GPA Calculator | Calculate Grade Point Average by Credits",
  description: "Quickly calculate your GPA using letter grades and credit hours. Determine what grades you need in the future to improve your GPA.",
  
  alternates: {
    canonical: "https://www.my-gpacalculator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "GPA Calculator | Calculate Grade Point Average by Credits",
    description: "Quickly calculate your GPA using letter grades and credit hours. Determine what grades you need in the future to improve your GPA.",
    url: "https://www.my-gpacalculator.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.my-gpacalculator.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "GPA Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator | Calculate Grade Point Average by Credits",
    description: "Quickly calculate your GPA using letter grades and credit hours. Determine what grades you need in the future to improve your GPA.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "gpa-tool",
              description: "Financial calculator tool",
              url: "https://www.gpa-tool.com",
              applicationCategory: "Finance",
              operatingSystem: "All",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
            }),
          }}
        />
    </head>
      <body>{children}</body>
    </html>
  );
}
