import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import BlogHeader from "./quartz/components/BlogHeader"
import BlogFooter from "./quartz/components/BlogFooter"
import { isBlogListing } from "./quartz/util/blog"

const articleOnly = (component: ReturnType<typeof Component.ArticleTitle>) =>
  Component.ConditionalRender({
    component,
    condition: (page) => !isBlogListing(page.fileData.slug!),
  })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [BlogHeader()],
  afterBody: [],
  footer: BlogFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    articleOnly(Component.Breadcrumbs({ rootName: "首页", showCurrentPage: false })),
    articleOnly(Component.ArticleTitle()),
    articleOnly(Component.ContentMeta()),
    articleOnly(Component.TagList()),
  ],
  left: [],
  right: [articleOnly(Component.TableOfContents())],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [],
  right: [],
}
