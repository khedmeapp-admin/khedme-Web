import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar & Footer only on non-admin pages */}
      {!isAdminPage && <Navbar />}
      <Toaster position="top-center" />

      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}
