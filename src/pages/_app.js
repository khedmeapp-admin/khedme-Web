// src/pages/_app.js
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps, router }) {
  const isAdminPage = router.pathname.startsWith("/admin");

  if (isAdminPage) {
    // Apply dark/light theme toggle only to admin pages
    return (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  // All other pages use your original look (no dark theme)
  return <Component {...pageProps} />;
}
