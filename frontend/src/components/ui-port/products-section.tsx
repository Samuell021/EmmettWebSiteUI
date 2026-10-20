"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

import type { HomeProduct } from "./home-data";
import { ForwardMark } from "./forward-mark";

const productChrome = [
  { id: "pentestor", num: "01", href: "/products/pentestor", bgFrom: "#07130F", bgTo: "#102A20" },
  { id: "crm", num: "02", href: "/products/crm", bgFrom: "#0B1F18", bgTo: "#16382B" },
  { id: "property", num: "03", href: "/products", bgFrom: "#102A20", bgTo: "#0B1F18" },
] as const;

function PentestorUI() {
  const t = useTranslations("ui.products.pentestor");
  const rows = t.raw("rows") as Array<{ label: string; value: string }>;
  const status = ["ok", "alert", "warn", "ok"] as const;
  return (
    <div className="space-y-2 p-4 rounded-xl bg-[rgba(31,174,110,0.04)] border border-[rgba(31,174,110,0.1)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-mono text-[rgba(31,174,110,0.6)] tracking-widest uppercase">
          {t("status")}
        </span>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.label}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-[rgba(16,42,32,0.4)] border border-[rgba(31,174,110,0.06)]"
        >
          <span className="text-[10px] font-mono text-muted-on-dark">{row.label}</span>
          <span
            className={`text-[10px] font-mono font-semibold ${
              status[index] === "alert"
                ? "text-red-400"
                : status[index] === "warn"
                  ? "text-amber-400"
                  : "text-primary"
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CrmUI() {
  const t = useTranslations("ui.products.crm");
  const names = t.raw("stages") as string[];
  const stages = [
    { stage: names[0] ?? "", count: 24, pct: 75 },
    { stage: names[1] ?? "", count: 12, pct: 45 },
    { stage: names[2] ?? "", count: 6, pct: 22 },
    { stage: names[3] ?? "", count: 3, pct: 12 },
  ];
  return (
    <div className="space-y-2 p-4 rounded-xl bg-[rgba(31,174,110,0.04)] border border-[rgba(31,174,110,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-muted-on-dark tracking-widest uppercase">
          {t("title")}
        </span>
        <span className="text-[10px] font-mono text-primary">{t("period")}</span>
      </div>
      {stages.map((row) => (
        <div key={row.stage} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-on-dark">{row.stage}</span>
            <span className="text-[10px] font-mono text-[rgba(243,250,246,0.6)]">{row.count}</span>
          </div>
          <div className="h-1 rounded-full bg-[rgba(31,174,110,0.12)]">
            <div className="h-1 rounded-full bg-primary" style={{ width: `${row.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PropertyUI() {
  const t = useTranslations("ui.products.property");
  const areas = t.raw("areas") as string[];
  const listings = [
    { area: areas[0] ?? "", price: "18,400/m²", score: 94 },
    { area: areas[1] ?? "", price: "21,200/m²", score: 88 },
    { area: areas[2] ?? "", price: "15,800/m²", score: 82 },
    { area: areas[3] ?? "", price: "13,200/m²", score: 77 },
  ];
  return (
    <div className="space-y-2 p-4 rounded-xl bg-[rgba(31,174,110,0.04)] border border-[rgba(31,174,110,0.1)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-muted-on-dark tracking-widest uppercase">
          {t("city")}
        </span>
        <span className="text-[10px] font-mono text-primary">{t("active")}</span>
      </div>
      {listings.map((row) => (
        <div
          key={row.area}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-[rgba(16,42,32,0.4)] border border-[rgba(31,174,110,0.06)]"
        >
          <span className="text-[10px] font-mono text-muted-on-dark">{row.area}</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-muted-on-dark">₺ {row.price}</span>
            <span className="text-[10px] font-mono font-semibold text-primary">{row.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductUI({ id }: { id: string }) {
  if (id === "pentestor") return <PentestorUI />;
  if (id === "crm") return <CrmUI />;
  return <PropertyUI />;
}

type ProductCopy = { name: string; tagline: string; copy: string; tags: string[]; pill: string };

export function ProductsSection({ products: items }: { products: HomeProduct[] | null }) {
  const t = useTranslations("ui.products");
  const copy = t.raw("slots") as ProductCopy[];
  const products = productChrome
    .map((slot, index) => {
      const text = copy[index];
      const live = items?.[index];
      return {
        ...slot,
        num: live?.num ?? slot.num,
        name: items === null ? (text?.name ?? "") : (live?.name ?? ""),
        tagline: text?.tagline ?? "",
        copy: items === null ? (text?.copy ?? "") : (live?.copy ?? ""),
        tags: text?.tags ?? [],
        pill: text?.pill ?? "",
        href: items === null ? slot.href : (live?.href ?? slot.href),
      };
    })
    .filter((card) => items === null || card.name);
  return (
    <section className="py-28 lg:py-36" style={{ background: "#0B1F18" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-6 h-px bg-primary" />
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-primary">
              {t("eyebrow")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium tracking-tight text-foreground leading-tight max-w-2xl"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-4 text-base text-muted-on-dark max-w-[52ch] leading-relaxed"
          >
            {t("lead")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl overflow-hidden border border-[rgba(31,174,110,0.1)] hover:border-[rgba(31,174,110,0.25)] transition-all duration-300"
              style={{ background: `linear-gradient(160deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)` }}
            >
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-mono text-muted-on-dark tracking-widest">
                    {p.num}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[rgba(31,174,110,0.2)] text-[rgba(31,174,110,0.6)] tracking-wider">
                    {p.pill}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{p.name}</h3>
                <p className="text-sm text-muted-on-dark mb-3 italic">{p.tagline}</p>
                <p className="text-sm text-muted-on-dark leading-relaxed">{p.copy}</p>
              </div>

              <div className="px-6 py-3 flex-1">
                <ProductUI id={p.id} />
              </div>

              <div className="p-6 pt-4 border-t border-[rgba(31,174,110,0.08)]">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-[rgba(31,174,110,0.06)] border border-input text-[rgba(31,174,110,0.55)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={p.href}
                  className="group inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-accent transition-colors"
                >
                  {t("view")}
                  <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/products"
            className="text-sm font-mono text-muted-on-dark hover:text-[rgba(243,250,246,0.65)] transition-colors"
          >
            {t("seeAll")} <ForwardMark />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
