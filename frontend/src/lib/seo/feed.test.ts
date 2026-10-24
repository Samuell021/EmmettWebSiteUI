import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchFeed } from "@/lib/seo/feed";

describe("lib/seo/feed", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("returns 200 RSS XML when upstream succeeds", async () => {
    fetchMock.mockResolvedValueOnce(new Response("<rss version='2.0'></rss>", { status: 200 }));
    const res = await fetchFeed("blog", "fa");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/rss+xml");
    expect(await res.text()).toContain("<rss");
  });

  it("returns 502 when upstream fails or throws", async () => {
    fetchMock.mockResolvedValueOnce(new Response("error", { status: 500 }));
    const res1 = await fetchFeed("academy", "invalid-locale");
    expect(res1.status).toBe(502);

    fetchMock.mockRejectedValueOnce(new Error("connection refused"));
    const res2 = await fetchFeed("blog", "en");
    expect(res2.status).toBe(502);
  });
});
