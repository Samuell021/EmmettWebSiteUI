import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X, Terminal, ChevronRight, Search } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Library", href: "/library" },
  { label: "Academy", href: "/academy" },
  { label: "About", href: "/about" },
];

const paletteItems = [
  { label: "Home", category: "Page", href: "/" },
  { label: "Services — The Engineering System", category: "Page", href: "/services" },
  { label: "Products — The Product Lab", category: "Page", href: "/products" },
  { label: "PenTestor — Security Engineering", category: "Product", href: "/products/pentestor" },
  { label: "CRM — Business Systems", category: "Product", href: "/products/crm" },
  { label: "Projects — Proof of Work", category: "Page", href: "/projects" },
  { label: "Library — Engineering Knowledge", category: "Page", href: "/library" },
  { label: "Academy — Learning Paths", category: "Page", href: "/academy" },
  { label: "About — Who We Are", category: "Page", href: "/about" },
  { label: "Contact — Start a Project", category: "Action", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    if (y > 400) {
      setHidden(y > lastScrollY && y > 200);
    } else {
      setHidden(false);
    }
    setLastScrollY(y);
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setPaletteOpen((v) => !v);
    }
    if (e.key === "Escape") {
      setPaletteOpen(false);
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filtered = paletteQuery
    ? paletteItems.filter(
        (i) =>
          i.label.toLowerCase().includes(paletteQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(paletteQuery.toLowerCase())
      )
    : paletteItems;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "backdrop-blur-xl bg-[rgba(11,31,24,0.92)] border-b border-[rgba(31,174,110,0.1)]"
            : "bg-[rgba(7,19,15,0.2)]"
        }`}
        style={{ height: 64 }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-base tracking-[0.2em] text-[#F3FAF6] font-semibold">EMMETT</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-[rgba(243,250,246,0.28)] uppercase">GROUP</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `relative text-sm transition-colors duration-150 py-1 group ${
                    isActive
                      ? "text-[#F3FAF6]"
                      : "text-[rgba(243,250,246,0.48)] hover:text-[rgba(243,250,246,0.8)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-px left-0 h-px bg-[#1FAE6E] transition-all duration-150 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[rgba(31,174,110,0.12)] bg-[rgba(31,174,110,0.03)] text-[rgba(243,250,246,0.28)] text-xs font-mono hover:border-[rgba(31,174,110,0.25)] hover:text-[rgba(243,250,246,0.55)] transition-all"
            >
              <Terminal className="w-3 h-3" />
              <span>⌘K</span>
            </button>

            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg bg-[#1FAE6E] text-[#07130F] text-sm font-semibold hover:bg-[#35C98A] transition-all duration-150"
            >
              Start a Project
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg border border-[rgba(31,174,110,0.12)] bg-[rgba(31,174,110,0.03)]"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-[rgba(243,250,246,0.6)]" />
              ) : (
                <Menu className="w-5 h-5 text-[rgba(243,250,246,0.6)]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 pt-16 backdrop-blur-xl lg:hidden"
          style={{ background: "rgba(7,19,15,0.98)" }}
        >
          <div className="px-6 py-8 space-y-0.5">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between h-14 border-b border-[rgba(31,174,110,0.08)] text-lg transition-colors ${
                    isActive ? "text-[#F3FAF6]" : "text-[rgba(243,250,246,0.48)]"
                  }`
                }
              >
                {item.label}
                <ChevronRight className="w-4 h-4 opacity-20" />
              </NavLink>
            ))}
            <div className="pt-8">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full h-14 rounded-xl bg-[#1FAE6E] text-[#07130F] font-semibold text-sm"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Command Palette */}
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setPaletteOpen(false)}
        >
          <div className="absolute inset-0 bg-[#07130F]/75 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-[560px] rounded-xl border border-[rgba(31,174,110,0.15)] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
            style={{ background: "rgba(11,31,24,0.98)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[rgba(31,174,110,0.1)]">
              <Search className="w-4 h-4 text-[rgba(243,250,246,0.3)] flex-shrink-0" />
              <input
                autoFocus
                value={paletteQuery}
                onChange={(e) => setPaletteQuery(e.target.value)}
                placeholder="Search pages, products, commands…"
                className="flex-1 bg-transparent text-[#F3FAF6] font-mono text-sm placeholder:text-[rgba(243,250,246,0.2)] outline-none"
              />
              <kbd className="text-[10px] font-mono text-[rgba(243,250,246,0.2)] border border-[rgba(31,174,110,0.12)] rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-[rgba(243,250,246,0.3)] font-mono">
                  No results found.
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(item.href);
                      setPaletteOpen(false);
                      setPaletteQuery("");
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-[rgba(31,174,110,0.06)] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="w-3 h-3 text-[rgba(243,250,246,0.18)] group-hover:text-[#1FAE6E] transition-colors" />
                      <span className="text-sm text-[rgba(243,250,246,0.55)] group-hover:text-[#F3FAF6] transition-colors font-mono">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[rgba(243,250,246,0.2)] uppercase tracking-widest">
                      {item.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
