"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import type { HomeProject } from "./home-data";
import { ForwardMark } from "./forward-mark";

const projectNums = ["001", "002", "003"] as const;

type ProjectCopy = {
  title: string;
  industry: string;
  description: string;
  tech: string[];
  outcome: string;
  year: string;
};

export function ProjectsSection({
  projects: items,
  total,
}: {
  projects: HomeProject[] | null;
  total: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const t = useTranslations("ui.projects");
  const copy = t.raw("slots") as ProjectCopy[];
  const projects = projectNums
    .map((num, index) => {
      const text = copy[index];
      const live = items?.[index];
      if (items !== null && !live) return null;
      return {
        num: live?.num ?? num,
        title: live?.title || text?.title || "",
        industry: live?.industry || text?.industry || "",
        description: live?.description || text?.description || "",
        tech: text?.tech ?? [],
        outcome: text?.outcome ?? "",
        year: live?.year || text?.year || "",
        href: live?.href || "/projects",
      };
    })
    .filter((project) => project !== null);

  return (
    <section className="py-28 lg:py-36" style={{ background: "#DDEDE5" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-[1fr_1fr] gap-8 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-px bg-[#0B6B48]" />
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#0B6B48]">
                {t("eyebrow")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium tracking-tight text-[#102A20] leading-tight"
            >
              {t("title")}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-[rgba(16,42,32,0.55)] leading-relaxed max-w-[40ch] lg:text-end lg:ms-auto"
          >
            {t("lead")}
          </motion.p>
        </div>

        {/* Project list — editorial, not cards */}
        <div className="space-y-0">
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="border-t border-[rgba(16,42,32,0.12)] py-8 group cursor-default"
            >
              <div className="grid lg:grid-cols-[80px_1fr_280px] gap-6 items-start">
                {/* Number */}
                <div className="pt-1">
                  <span className="text-[clamp(1.8rem,4vw,3rem)] font-mono font-bold text-[rgba(16,42,32,0.12)] leading-none select-none">
                    {p.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[rgba(16,42,32,0.4)]">
                      {p.industry}
                    </span>
                    <span className="text-[rgba(16,42,32,0.2)] text-sm">·</span>
                    <span className="text-[10px] font-mono text-[rgba(16,42,32,0.3)]">
                      {p.year}
                    </span>
                  </div>
                  <h3
                    className="text-xl lg:text-2xl font-semibold text-[#102A20] mb-3 transition-colors duration-200"
                    style={{ color: hovered === i ? "#0B6B48" : "#102A20" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-[rgba(16,42,32,0.55)] leading-relaxed max-w-[52ch] mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-[rgba(16,42,32,0.15)] text-[rgba(16,42,32,0.45)] bg-[rgba(16,42,32,0.04)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div className="lg:text-end">
                  <div className="inline-block text-start lg:text-end">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[rgba(16,42,32,0.3)] block mb-2">
                      {t("outcome")}
                    </span>
                    <p
                      className="text-sm font-mono font-semibold transition-colors duration-200"
                      style={{ color: hovered === i ? "#0B6B48" : "rgba(16,42,32,0.7)" }}
                    >
                      {p.outcome}
                    </p>
                  </div>

                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 lg:flex lg:justify-end"
                    >
                      <Link
                        href={p.href}
                        className="text-[11px] font-mono text-[#0B6B48] hover:text-[#1FAE6E] transition-colors"
                      >
                        {t("caseStudy")} <ForwardMark />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-[rgba(16,42,32,0.12)] pt-8 mt-0 flex items-center justify-between">
          <span className="text-sm font-mono text-[rgba(16,42,32,0.4)]">
            {items === null ? t("shownFallback") : t("shown", { shown: projects.length, total })}
          </span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#0B6B48] hover:text-[#1FAE6E] transition-colors"
          >
            {t("viewAll")} <ForwardMark />
          </Link>
        </div>
      </div>
    </section>
  );
}
