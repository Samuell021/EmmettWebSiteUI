import type {
  BlogPostListItem,
  CourseListItem,
  Paginated,
  ProjectListItem,
  ServiceListItem,
} from "@/lib/api/types";
import { formatDate } from "@/lib/format/date";
import { toAppLocale } from "@/lib/seo/site";

/**
 * مدل نمایشی بخش‌های Home (فاز ۳).
 *
 * فقط فیلدهایی که اندپوینت فهرست واقعاً برمی‌گرداند اینجا نگاشت می‌شوند.
 * عنوان ثابت بخش‌ها، تگ‌ها، داشبورد کارت محصول، پشته و نتیجهٔ پروژه، دستهٔ
 * مقاله و برچسب گره‌های آکادمی متن طراحی‌اند و در خود کامپوننت می‌مانند.
 */

export type HomeService = {
  id: string;
  num: string;
  title: string;
  copy: string;
  href: string;
};

export type HomeProduct = {
  id: string;
  num: string;
  name: string;
  tagline: string;
  copy: string;
  href: string;
  pill: string;
};

export type HomeProject = {
  id: string;
  num: string;
  title: string;
  industry: string;
  description: string;
  year: string;
  href: string;
};

export type HomeArticle = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  initials: string;
  date: string;
  readTime: string;
  href: string;
};

export type HomeCourse = {
  id: string;
  slug: string;
  title: string;
  levelLabel: string;
  meta: string;
  href: string;
};

export type HomeContent = {
  /** ``null`` یعنی همان اندپوینت در دسترس نبود؛ بخش، متن طراحی را نگه می‌دارد. */
  services: HomeService[] | null;
  products: HomeProduct[] | null;
  projects: HomeProject[] | null;
  projectTotal: number;
  articles: HomeArticle[] | null;
  courses: HomeCourse[] | null;
};

const PREVIEW = { products: 3, projects: 3, articles: 5, courses: 3 } as const;

function pad(index: number, width: number) {
  return String(index + 1).padStart(width, "0");
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? (parts[1]?.[0] ?? "") : "";
  return `${first}${second}`.toUpperCase();
}

export function mapServices(data: Paginated<ServiceListItem> | null): HomeService[] {
  return (data?.results ?? []).map((service, index) => ({
    id: service.public_id,
    num: pad(index, 2),
    title: service.title,
    copy: service.summary,
    href: `/services/${service.slug}`,
  }));
}

export function mapProducts(data: Paginated<ProjectListItem> | null): HomeProduct[] {
  return (data?.results ?? []).slice(0, PREVIEW.products).map((product, index) => ({
    id: product.public_id,
    num: pad(index, 2),
    name: product.title,
    tagline: product.client_name,
    copy: product.summary,
    href: `/projects/${product.slug}`,
    pill: product.year == null ? "" : String(product.year),
  }));
}

export function mapProjects(data: Paginated<ProjectListItem> | null): HomeProject[] {
  return (data?.results ?? []).slice(0, PREVIEW.projects).map((project, index) => ({
    id: project.public_id,
    num: pad(index, 3),
    title: project.title,
    industry: project.client_name,
    description: project.summary,
    year: project.year == null ? "" : String(project.year),
    href: `/projects/${project.slug}`,
  }));
}

export function mapArticles(
  data: Paginated<BlogPostListItem> | null,
  locale: string,
  minuteLabel: string,
): HomeArticle[] {
  const appLocale = toAppLocale(locale);
  return (data?.results ?? []).slice(0, PREVIEW.articles).map((post) => ({
    id: post.public_id,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author_name ?? "",
    initials: initials(post.author_name ?? ""),
    date: post.published_at ? formatDate(post.published_at, appLocale) : "",
    readTime: `${post.reading_time_minutes} ${minuteLabel}`,
    href: `/blog/${post.slug}`,
  }));
}

export function mapCourses(
  data: Paginated<CourseListItem> | null,
  levelLabel: (level: CourseListItem["level"]) => string,
  hoursLabel: string,
): HomeCourse[] {
  return (data?.results ?? []).slice(0, PREVIEW.courses).map((course) => ({
    id: course.public_id,
    slug: course.slug,
    title: course.title,
    levelLabel: levelLabel(course.level),
    meta: course.duration_hours ? `${course.duration_hours} ${hoursLabel}` : "",
    href: `/academy/${course.slug}`,
  }));
}
