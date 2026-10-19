import { QuartzComponent, QuartzComponentConstructor } from "./types"
import Search from "./Search"
import ReaderMode from "./ReaderMode"
import { pathToRoot } from "../util/path"
import { concatenateResources } from "../util/resources"
import { isBlogListing } from "../util/blog"

export default (() => {
  const SearchBox = Search()
  const Reader = ReaderMode()
  const BlogHeader: QuartzComponent = (props) => (
    <div class="blog-header">
      <a class="blog-name internal" href={pathToRoot(props.fileData.slug!)}>
        <span
          class="blog-mark"
          aria-hidden="true"
          style={{
            "--blog-logo": `url("${pathToRoot(props.fileData.slug!)}/static/company-logo.svg")`,
          }}
        />
        {props.cfg.pageTitle}
      </a>
      <nav class="blog-nav" aria-label="网站导航">
        <a href="https://jupiterthewarlock.com" class="personal-link">
          个人主页 <span aria-hidden="true">↗</span>
        </a>
        <SearchBox {...props} />
        {!isBlogListing(props.fileData.slug!) && <Reader {...props} />}
      </nav>
    </div>
  )
  BlogHeader.css = concatenateResources(SearchBox.css, Reader.css)
  BlogHeader.afterDOMLoaded = SearchBox.afterDOMLoaded
  BlogHeader.beforeDOMLoaded = Reader.beforeDOMLoaded
  return BlogHeader
}) satisfies QuartzComponentConstructor
