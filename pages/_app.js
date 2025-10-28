// pages/_app.js
import "../src/styles/globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Toaster } from "sonner"; // <-- sonner toaster

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Progress Bar */}
      <NextNProgress
        color="#f97316"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Page Transition + Padding below Navbar */}
      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-grow pt-20" // 🟧 Added padding to push content down
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <Footer />

      {/* Sonner Toaster — Orange Theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff7ed",
            border: "1px solid #FDBA74",
            color: "#111",
          },
        }}
      />
    </div>
  );
}
