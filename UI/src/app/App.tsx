import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { ComingSoon } from "./pages/ComingSoon";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[#0B1F18] text-foreground overflow-x-hidden"
        >
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ComingSoon page="Services" subtitle="Engineering across the entire stack" />} />
            <Route path="/products" element={<ComingSoon page="Products" subtitle="Products born from engineering problems" />} />
            <Route path="/products/pentestor" element={<ComingSoon page="Pentestor" subtitle="AI-powered security engineering" />} />
            <Route path="/products/crm" element={<ComingSoon page="CRM" subtitle="Business systems engineered around real workflows" />} />
            <Route path="/projects" element={<ComingSoon page="Projects" subtitle="Proof of work — real systems, real constraints" />} />
            <Route path="/library" element={<ComingSoon page="Library" subtitle="What we're learning, building and thinking about" />} />
            <Route path="/academy" element={<ComingSoon page="Academy" subtitle="Build your way into deeper knowledge" />} />
            <Route path="/about" element={<ComingSoon page="About" subtitle="We are builders first" />} />
            <Route path="/contact" element={<ComingSoon page="Contact" subtitle="Have a difficult problem?" />} />
          </Routes>
        </motion.div>
      )}
    </BrowserRouter>
  );
}
