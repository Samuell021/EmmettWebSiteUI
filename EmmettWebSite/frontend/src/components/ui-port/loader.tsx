"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * لودر آغازین — پورت ۱:۱ `UI/src/app/components/Loader.tsx` (فاز ۲).
 *
 * جریان نمایش مو‌به‌مو همان بستهٔ UI است: نوار پیشرفت هر ۲۵ms دو درصد جلو
 * می‌رود، ۳۰۰ms توقف و سپس محو شدن (exit با duration ۰.۴). تنها افزودهٔ این
 * نسخه، احترام به `prefers-reduced-motion` است — همان‌طور که قاعدهٔ سراسری
 * globals.css هم همهٔ انیمیشن‌ها را در این حالت خنثی می‌کند: پوشش با قاعدهٔ
 * CSS (`.ui-loader` در ui-theme.css) پنهان می‌شود و اینجا فقط تایمر شروع
 * نمی‌شود تا کاری بی‌دلیل اجرا نشود.
 */
export function Loader() {
  const t = useTranslations("ui.loader");
  const brand = useTranslations("ui");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden
          className="ui-loader fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "#07130F" }}
        >
          <div className="text-center space-y-8">
            <div className="font-mono text-5xl tracking-[0.2em] text-[#F3FAF6] font-semibold">
              {brand("brand")}
            </div>

            <div className="space-y-3 w-72 mx-auto">
              <div className="flex items-center justify-between text-xs font-mono text-[rgba(243,250,246,0.28)]">
                <span>{t("initializing")}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-px bg-[rgba(31,174,110,0.12)] overflow-hidden">
                <motion.div
                  className="h-full bg-[#1FAE6E]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            <p className="text-xs font-mono text-[rgba(243,250,246,0.2)] tracking-widest">
              {t("collective")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
