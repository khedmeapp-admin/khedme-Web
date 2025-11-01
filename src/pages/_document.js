import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and SEO meta tags */}
        <meta
          name="description"
          content="Khedmeبال connects skilled providers with customers who need their services — fast, secure, and easy."
        />
        <meta
          name="keywords"
          content="Khedme, jobs, services, Lebanon, providers, hire, skilled work"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Khedmeبال" />
        <meta
          property="og:description"
          content="Connecting skilled providers with customers who need their services — fast, secure, and easy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://khedme.vercel.app" />
        <meta property="og:image" content="/favicon.svg" />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
