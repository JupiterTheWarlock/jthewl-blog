import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import BlogIndex from "../BlogIndex"
import { isArchived } from "../../util/blog"

const Content: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, tree } = props
  if (fileData.slug === "index") return <BlogIndex {...props} />
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return (
    <article class={classString}>
      {isArchived(fileData) && <p class="archive-notice">已归档</p>}
      {content}
    </article>
  )
}
Content.afterDOMLoaded = BlogIndex.afterDOMLoaded

export default (() => Content) satisfies QuartzComponentConstructor
