import { QuartzComponent } from "./types"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, simplifySlug } from "../util/path"
import { blogPosts, featuredRank, postCover, postSummary } from "../util/blog"
import { getDate } from "./Date"
import { QuartzPluginData } from "../plugins/vfile"
// @ts-ignore
import script from "./scripts/blogIndex.inline"

const BlogIndex: QuartzComponent = ({ allFiles, fileData, cfg }) => {
  const publicationDate = (post: QuartzPluginData) =>
    post.frontmatter?.published ? getDate(cfg, post) : undefined
  const slug = fileData.slug!
  const scope = simplifySlug(slug).replace(/\/$/, "")
  const home = slug === "index"
  const tag = scope.startsWith("tags/") ? scope.slice(5) : undefined
  const allPosts = blogPosts(allFiles)
  const posts = allPosts
    .filter((post) => {
      if (home || scope === "tags") return true
      if (tag) return (post.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag)
      return post.slug!.startsWith(`${scope}/`)
    })
    .sort(
      (a, b) =>
        featuredRank(a) - featuredRank(b) ||
        (publicationDate(b)?.getTime() ?? 0) - (publicationDate(a)?.getTime() ?? 0),
    )
  const topics = ["游戏开发", "AI", "独立游戏", "思考", "工作流", "GameJam"].filter((topic) =>
    allPosts.some((post) => post.frontmatter?.tags?.includes(topic)),
  )
  const categories = [
    { name: "全部", slug: "index", count: allPosts.length },
    ...["文章", "随笔"].map((name) => ({
      name,
      slug: `${name}/index`,
      count: allPosts.filter((post) => post.slug!.startsWith(`${name}/`)).length,
    })),
  ]

  return (
    <main class="blog-index" id="blog-content">
      <div class="blog-intro">
        <div>
          <h1>
            {home || scope === "tags"
              ? "文章与随笔"
              : tag
                ? `关于「${tag}」`
                : fileData.frontmatter?.title}
          </h1>
          <p>
            {home
              ? "游戏开发、AI 实践，以及一些想法。"
              : tag
                ? "围绕这个话题的记录与思考。"
                : scope === "文章"
                  ? "展开聊聊游戏、技术和实践。"
                  : "开发途中的观察、尝试与碎碎念。"}
          </p>
        </div>
        <span class="blog-total">{posts.length} 篇</span>
      </div>

      <div class="blog-toolbar">
        <nav class="blog-categories" aria-label="内容分类">
          {categories.map((category) => (
            <a
              class="internal"
              href={resolveRelative(slug, category.slug as FullSlug)}
              aria-current={
                simplifySlug(category.slug as FullSlug).replace(/\/$/, "") === scope
                  ? "page"
                  : undefined
              }
            >
              {category.name}
              <span>{category.count}</span>
            </a>
          ))}
        </nav>
        <label class="blog-sort" hidden>
          <span class="sr-only">文章排序</span>
          <select aria-label="文章排序" data-blog-sort>
            <option value="featured">精选优先</option>
            <option value="latest">最新发布</option>
          </select>
        </label>
      </div>

      <nav class="blog-topics" aria-label="文章话题">
        <span>话题</span>
        {topics.map((topic) => (
          <a
            class="internal"
            href={resolveRelative(slug, `tags/${topic}` as FullSlug)}
            aria-current={tag === topic ? "page" : undefined}
          >
            {topic === "GameJam" ? "游戏创作挑战" : topic}
          </a>
        ))}
      </nav>

      <div class="blog-grid">
        {posts.map((post, index) => {
          const cover = postCover(post, slug)
          const date = publicationDate(post)
          const rank = featuredRank(post)
          const featured = rank !== Number.MAX_SAFE_INTEGER
          const tags = post.frontmatter?.tags?.slice(0, 2) ?? []
          const category = post.slug!.split("/")[0]
          return (
            <article
              class={`blog-card${cover ? " has-cover" : " text-card"}`}
              data-date={date?.getTime() ?? 0}
              data-featured={rank}
            >
              <a
                class="blog-card-link internal"
                href={resolveRelative(slug, post.slug!)}
                data-no-popover="true"
              >
                {cover && (
                  <div class="blog-card-cover">
                    <img
                      src={cover}
                      alt=""
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                )}
                <div class="blog-card-body">
                  <div class="blog-card-kicker">
                    <span>{category}</span>
                    {featured && (
                      <span class="featured-label">
                        精选 <span aria-hidden="true">↗</span>
                      </span>
                    )}
                  </div>
                  <h2>{post.frontmatter?.title}</h2>
                  <p class="blog-card-summary">{postSummary(post)}</p>
                  <div class="blog-card-bottom">
                    <span class="blog-card-tags">{tags.join(" · ")}</span>
                    {date && (
                      <time datetime={date.toISOString()}>
                        {date
                          .toLocaleDateString("zh-CN", {
                            timeZone: "Asia/Shanghai",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replaceAll("/", ".")}
                      </time>
                    )}
                  </div>
                </div>
              </a>
            </article>
          )
        })}
      </div>
      {posts.length === 0 && (
        <p class="blog-empty">
          这个分类还没有文章。
          <a class="internal" href={resolveRelative(slug, "index" as FullSlug)}>
            浏览全部内容
          </a>
        </p>
      )}
      <div class="blog-pagination" hidden>
        <p class="blog-progress" role="status" aria-live="polite"></p>
        <button type="button" data-blog-more>
          再看 12 篇 <span aria-hidden="true">↓</span>
        </button>
      </div>
    </main>
  )
}

BlogIndex.afterDOMLoaded = script
export default BlogIndex
