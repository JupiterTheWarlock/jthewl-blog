import { QuartzComponent, QuartzComponentConstructor } from "./types"
import { pathToRoot } from "../util/path"

export default (() => {
  const BlogFooter: QuartzComponent = ({ cfg, fileData }) => (
    <footer class="blog-footer">
      <span>
        © {new Date().getFullYear()} {cfg.pageTitle}
      </span>
      <a href={`${pathToRoot(fileData.slug!)}/index.xml`}>
        订阅 RSS <span aria-hidden="true">↗</span>
      </a>
    </footer>
  )
  return BlogFooter
}) satisfies QuartzComponentConstructor
