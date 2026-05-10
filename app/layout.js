export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GPA Calculator – Calculate Grade Point Average by Credits</title>
        <meta
          name="description"
          content="Quickly calculate your GPA using letter grades and credit hours. Simple GPA calculator for students."
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
