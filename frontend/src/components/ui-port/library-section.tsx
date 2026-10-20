"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import type { HomeArticle } from "./home-data";
import { ForwardMark } from "./forward-mark";

// همان خانوادهٔ رنگی بستهٔ UI، تیره‌شده تا روی پس‌زمینهٔ روشن کنتراست
// WCAG AA (≥۴٫۵) داشته باشد (Lighthouse: color-contrast).
const categoryColors = ["#0B6B48", "#1D6FB8", "#0E7A6D", "#8A5A00", "#6C4BD8"] as const;

type ArticleCopy = {
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt?: string;
};

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export function LibrarySection({ articles: items }: { articles: HomeArticle[] | null }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const t = useTranslations("ui.library");
  const copy = t.raw("slots") as ArticleCopy[];
  const articles = copy
    .map((slot, index) => {
      const live = items?.[index];
      if (items !== null && !live) return null;
      const author = live?.author || slot.author;
      return {
        category: slot.category,
        color: categoryColors[index] ?? "#1FAE6E",
        title: live?.title || slot.title,
        excerpt: live?.excerpt || slot.excerpt || "",
        author,
        date: live?.date || slot.date,
        readTime: live?.readTime || slot.readTime,
        href: live?.href || "/blog",
        initials: live?.initials || initialsOf(author),
      };
    })
    .filter((article) => article !== null);
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="py-28 lg:py-36" style={{ background: "#F4F6F1" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-6 h-px bg-primary" />
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-emerald-deep">
              {t("eyebrow")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium tracking-tight text-[#102A20] leading-tight max-w-3xl"
          >
            {t("title")}
          </motion.h2>
        </div>

        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 p-8 rounded-2xl border border-[rgba(16,42,32,0.1)] bg-[rgba(16,42,32,0.03)] group cursor-default hover:bg-[rgba(16,42,32,0.05)] transition-all duration-200"
          >
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{
                      color: featured.color,
                      background: `${featured.color}15`,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted-on-light tracking-widest">
                    {t("featured")}
                  </span>
                </div>
                {/* Editorial serif title for featured */}
                <h3 className="font-editorial text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-[#102A20] leading-tight mb-4">
                  {featured.title}
                </h3>
                <p className="text-sm text-muted-on-light leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[rgba(16,42,32,0.15)] flex items-center justify-center">
                      <span className="text-[8px] font-mono text-muted-on-light">AK</span>
                    </div>
                    <span className="text-xs font-mono text-muted-on-light">{featured.author}</span>
                  </div>
                  <span className="text-muted-on-light">·</span>
                  <span className="text-xs font-mono text-muted-on-light">{featured.date}</span>
                  <span className="text-muted-on-light">·</span>
                  <span className="text-xs font-mono text-muted-on-light">
                    {t("readSuffix", { time: featured.readTime })}
                  </span>
                </div>
              </div>
              {/* Right visual */}
              <div className="hidden lg:block h-44 rounded-xl bg-[rgba(16,42,32,0.06)] border border-[rgba(16,42,32,0.08)] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 120" className="w-full h-full opacity-25">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={i}
                        x1={20 + i * 24}
                        y1={10}
                        x2={20 + i * 24}
                        y2={110}
                        stroke="#102A20"
                        strokeWidth="0.3"
                      />
                    ))}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <line
                        key={i}
                        x1={10}
                        y1={15 + i * 18}
                        x2={190}
                        y2={15 + i * 18}
                        stroke="#102A20"
                        strokeWidth="0.3"
                      />
                    ))}
                    <polyline
                      points="20,90 44,70 68,75 92,45 116,55 140,30 164,40 188,20"
                      fill="none"
                      stroke="#1FAE6E"
                      strokeWidth="1.5"
                    />
                    {[20, 44, 68, 92, 116, 140, 164, 188].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={[90, 70, 75, 45, 55, 30, 40, 20][i]}
                        r="2.5"
                        fill="#1FAE6E"
                      />
                    ))}
                  </svg>
                </div>
                <div className="absolute bottom-3 end-3 text-[9px] font-mono text-muted-on-light tracking-widest uppercase">
                  {t("caption")}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Article rows */}
        <div className="space-y-0">
          {rest.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="border-t border-[rgba(16,42,32,0.1)] py-5 group cursor-default transition-all duration-150"
              style={{
                paddingInlineStart: hovered === i ? "12px" : "0",
                borderInlineStart:
                  hovered === i ? "2px solid rgba(31,174,110,0.4)" : "2px solid transparent",
              }}
            >
              <div className="grid lg:grid-cols-[100px_1fr_200px_80px_80px] gap-4 items-center">
                <span
                  className="text-[9px] font-mono tracking-widest uppercase"
                  style={{ color: article.color }}
                >
                  {article.category}
                </span>
                <h4 className="text-sm font-medium text-[#102A20] group-hover:text-emerald-deep transition-colors duration-150 pe-4">
                  <Link href={article.href}>{article.title}</Link>
                </h4>
                <span className="text-xs font-mono text-muted-on-light hidden lg:block">
                  {article.author}
                </span>
                <span className="text-xs font-mono text-muted-on-light hidden lg:block">
                  {article.date}
                </span>
                <div className="flex items-center justify-between lg:justify-end gap-4">
                  <span className="text-xs font-mono text-muted-on-light">{article.readTime}</span>
                  <span
                    className="text-sm text-muted-on-light group-hover:text-emerald-deep transition-colors duration-150"
                    aria-hidden
                  >
                    <ForwardMark />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-[rgba(16,42,32,0.1)] pt-8 mt-0 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-on-light">{t("taxonomy")}</span>
          <Link
            href="/blog"
            className="text-sm font-mono text-emerald-deep hover:text-accent transition-colors"
          >
            {t("open")} <ForwardMark />
          </Link>
        </div>
      </div>
    </section>
  );
}
