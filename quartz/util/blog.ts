import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, resolveRelative, simplifySlug } from "./path"
import { unescapeHTML } from "./escape"

export function isBlogListing(slug: string) {
  return slug === "index" || slug.endsWith("/index") || slug === "tags" || slug.startsWith("tags/")
}

export function blogPosts(files: QuartzPluginData[]) {
  return files.filter((file) => file.slug && !isBlogListing(file.slug) && !file.frontmatter?.draft)
}

export function postSummary(file: QuartzPluginData) {
  const explicit = file.frontmatter?.summary ?? file.frontmatter?.description
  let summary = typeof explicit === "string" ? explicit : ""
  if (!summary && file.htmlAst) {
    const paragraphs: string[] = []
    visit(file.htmlAst, "element", (node) => {
      if (node.tagName !== "p") return
      const text = toString(node).trim()
      if (text && !/^(原文链接|引用内容|同步自|\[)/.test(text)) paragraphs.push(text)
    })
    summary = paragraphs.join(" ")
  }
  summary ||= unescapeHTML(file.description ?? "")
  summary = summary
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim()
  return Array.from(summary).length > 110
    ? Array.from(summary).slice(0, 110).join("") + "…"
    : summary
}

// Markdown images have already been resolved relative to their own article by CrawlLinks.
// Resolve that URL before reusing it on a different listing page.
export function postCover(file: QuartzPluginData, listingSlug: FullSlug) {
  const explicit = file.frontmatter?.cover ?? file.frontmatter?.socialImage
  let source = typeof explicit === "string" ? explicit : ""
  if (!source && file.htmlAst) {
    visit(file.htmlAst, "element", (node) => {
      if (!source && node.tagName === "img" && typeof node.properties.src === "string") {
        source = node.properties.src
      }
    })
  }
  if (!source) return undefined
  if (/^https?:\/\//i.test(source)) return source
  if (source.startsWith("//")) return `https:${source}`
  if (/^[a-z][a-z\d+.-]*:/i.test(source)) return undefined
  const origin = "https://blog.invalid/"
  const resolved = new URL(source, origin + simplifySlug(file.slug!))
  const target = decodeURI(resolved.pathname.slice(1)) as FullSlug
  return resolveRelative(listingSlug, target) + resolved.search + resolved.hash
}

export function featuredRank(file: QuartzPluginData) {
  const rank = file.frontmatter?.featured
  return typeof rank === "number" && rank > 0 ? rank : Number.MAX_SAFE_INTEGER
}
