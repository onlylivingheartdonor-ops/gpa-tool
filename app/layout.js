export const metadata = {
  title: "GPA Calculator | Calculate Your Grade Point Average by Credits",
  description: "Calculate your cumulative GPA using letter grades and credit hours. See course breakdown, academic standing, and what grades you need to reach your target GPA.",

  alternates: {
    canonical: "https://www.my-gpacalculator.com",
  },

  openGraph: {
    title: "GPA Calculator | Calculate Your Grade Point Average by Credits",
    description: "Calculate your cumulative GPA using letter grades and credit hours. See course breakdown, academic standing, and what grades you need to reach your target GPA.",
    url: "https://www.my-gpacalculator.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.my-gpacalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "GPA Calculator — Calculate your grade point average",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator | Calculate Your Grade Point Average by Credits",
    description: "Calculate your cumulative GPA using letter grades and credit hours. See course breakdown and academic standing.",
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

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
              name: "GPA Calculator",
              description: "Free tool to calculate your cumulative GPA using letter grades and credit hours. See course breakdown, academic standing, and target GPA planning.",
              url: "https://www.my-gpacalculator.com",
              applicationCategory: "EducationApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}