document.addEventListener("nav", () => {
  const listing = document.querySelector<HTMLElement>(".blog-index")
  if (!listing) return
  const grid = listing.querySelector<HTMLElement>(".blog-grid")!
  const cards = Array.from(grid.querySelectorAll<HTMLElement>(".blog-card"))
  const pagination = listing.querySelector<HTMLElement>(".blog-pagination")!
  const more = listing.querySelector<HTMLButtonElement>("[data-blog-more]")!
  const sort = listing.querySelector<HTMLSelectElement>("[data-blog-sort]")!
  const status = listing.querySelector<HTMLElement>(".blog-progress")!
  let shown = 12

  const update = () => {
    cards.forEach((card, index) => (card.hidden = index >= shown))
    more.hidden = shown >= cards.length
    more.innerHTML = `再看 ${Math.min(12, Math.max(0, cards.length - shown))} 篇 <span aria-hidden="true">↓</span>`
    status.textContent = `已显示 ${Math.min(shown, cards.length)} / ${cards.length} 篇`
  }
  const showMore = () => {
    const next = cards[shown]?.querySelector<HTMLAnchorElement>("a")
    shown += 12
    update()
    next?.focus({ preventScroll: true })
  }
  const sortCards = () => {
    cards.sort(
      (a, b) =>
        (sort.value === "featured" ? Number(a.dataset.featured) - Number(b.dataset.featured) : 0) ||
        Number(b.dataset.date) - Number(a.dataset.date),
    )
    grid.append(...cards)
    shown = 12
    update()
  }
  // An unavailable source image should leave a readable text card, not a broken-image box.
  const images = Array.from(grid.querySelectorAll<HTMLImageElement>("img"))
  const hideFailedCover = (image: HTMLImageElement) => {
    const card = image.closest<HTMLElement>(".blog-card")!
    image.parentElement!.hidden = true
    card.classList.remove("has-cover")
    card.classList.add("text-card")
  }
  const imageHandlers = images.map((image) => {
    const handler = () => hideFailedCover(image)
    image.addEventListener("error", handler)
    if (image.complete && image.naturalWidth === 0) handler()
    return { image, handler }
  })

  pagination.hidden = false
  sort.closest<HTMLElement>(".blog-sort")!.hidden = false
  more.addEventListener("click", showMore)
  sort.addEventListener("change", sortCards)
  update()
  window.addCleanup(() => {
    more.removeEventListener("click", showMore)
    sort.removeEventListener("change", sortCards)
    imageHandlers.forEach(({ image, handler }) => image.removeEventListener("error", handler))
  })
})
