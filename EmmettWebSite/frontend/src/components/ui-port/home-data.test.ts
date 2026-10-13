import { describe, expect, it } from "vitest";

import type {
  BlogPostListItem,
  CourseListItem,
  Paginated,
  ProjectListItem,
  ServiceListItem,
} from "@/lib/api/types";
import { mapArticles, mapCourses, mapProducts, mapProjects, mapServices } from "./home-data";

function page<T>(results: T[], count = results.length): Paginated<T> {
  return { count, total_pages: 1, current_page: 1, next: null, previous: null, results };
}

describe("home section mappers", () => {
  it("maps only list fields and links each item to its detail route", () => {
    const services = page<ServiceListItem>([
      {
        public_id: "svc-1",
        title: "مهندسی نرم‌افزار",
        slug: "software",
        summary: "سیستم‌های قابل اتکا",
        icon: "code",
        is_featured: true,
        order: 1,
      },
    ]);
    expect(mapServices(services)).toEqual([
      {
        id: "svc-1",
        num: "01",
        title: "مهندسی نرم‌افزار",
        copy: "سیستم‌های قابل اتکا",
        href: "/services/software",
      },
    ]);
  });

  it("keeps products on the project detail route and does not invent tags", () => {
    const products = page<ProjectListItem>([
      {
        public_id: "prd-1",
        title: "Pentestor",
        slug: "pentestor",
        summary: "ارزیابی امنیتی",
        client_name: "Emmett",
        cover_image_url: null,
        year: 2026,
        is_product: true,
        is_featured: false,
      },
    ]);
    const mapped = mapProducts(products);
    expect(mapped[0]).toMatchObject({
      href: "/projects/pentestor",
      tagline: "Emmett",
      pill: "2026",
    });
    expect(mapped[0]).not.toHaveProperty("tags");
  });

  it("previews the first three projects and reports the full count separately", () => {
    const projects = page(
      Array.from({ length: 4 }, (_, index) => ({
        public_id: `p-${index}`,
        title: `Project ${index}`,
        slug: `project-${index}`,
        summary: "summary",
        client_name: "",
        cover_image_url: null,
        year: null,
        is_product: false,
        is_featured: false,
      })),
      12,
    );
    const mapped = mapProjects(projects);
    expect(mapped).toHaveLength(3);
    expect(mapped[0]).toMatchObject({ year: "", industry: "", href: "/projects/project-0" });
    expect(projects.count).toBe(12);
  });

  it("formats article dates through the locale formatter and builds author initials", () => {
    const posts = page<BlogPostListItem>([
      {
        public_id: "post-1",
        title: "Throughput",
        slug: "throughput",
        excerpt: "notes",
        cover_image_url: null,
        author_name: "Ali Karimi",
        reading_time_minutes: 14,
        published_at: "2026-08-12T00:00:00Z",
      },
    ]);
    const en = mapArticles(posts, "en", "min")[0]!;
    const fa = mapArticles(posts, "fa", "دقیقه")[0]!;
    expect(en).toMatchObject({
      href: "/blog/throughput",
      initials: "AK",
      readTime: "14 min",
      date: "August 12, 2026",
    });
    expect(fa.date).not.toBe(en.date);
    expect(fa.date.length).toBeGreaterThan(0);
  });

  it("uses the caller-supplied level label and hides a missing duration", () => {
    const courses = page<CourseListItem>([
      {
        public_id: "c-1",
        title: "Systems",
        slug: "systems",
        summary: "",
        level: "beginner",
        duration_hours: "",
        instructor_name: null,
        cover_image_url: null,
        is_featured: false,
      },
    ]);
    expect(
      mapCourses(courses, (level) => (level === "beginner" ? "مبتدی" : level), "ساعت"),
    ).toEqual([
      {
        id: "c-1",
        slug: "systems",
        title: "Systems",
        levelLabel: "مبتدی",
        meta: "",
        href: "/academy/systems",
      },
    ]);
  });

  it("returns empty lists when the API call failed", () => {
    expect(mapServices(null)).toEqual([]);
    expect(mapProducts(null)).toEqual([]);
    expect(mapProjects(null)).toEqual([]);
    expect(mapArticles(null, "en", "min")).toEqual([]);
    expect(mapCourses(null, (level) => level, "hours")).toEqual([]);
  });
});
