import commentIcon from '../assets/icons/comment.svg'
import heartIcon from '../assets/icons/heart.svg'
import { cards } from './mock-data.js'
import { applyLayout } from './layout-switcher.js'

const INITIAL_CARDS_COUNT = 8
const LOAD_MORE_COUNT = 8
const SKELETON_DELAY = 450

let visibleCardsCount = INITIAL_CARDS_COUNT

function createStat(icon, value, label) {
  return `
    <div class="flex items-center gap-1">
      <img src="${icon}" alt="" />
      <p aria-label="${label}">${value}</p>
    </div>
  `
}

function createCard(card) {
  return `
    <div class="flex items-center bg-white" data-layout-card>
      <img
        class="mr-7 size-24 object-cover"
        src="${card.rowsImage}"
        alt="${card.imageAlt}"
        data-layout-rows-image="${card.rowsImage}"
        data-layout-cols-image="${card.colsImage}"
        data-layout-image
      />
      <div class="flex" data-layout-card-content>
        <div data-layout-section="today">
          <p>${card.primaryDate}</p>
          <div class="flex gap-5" data-layout-stats>
            ${createStat(heartIcon, card.primaryLikes, 'Likes')}
            ${createStat(commentIcon, card.primaryComments, 'Comments')}
          </div>
        </div>
        <div data-layout-section="date">
          <p>${card.secondaryDate}</p>
          <div class="flex gap-5" data-layout-stats>
            ${createStat(heartIcon, card.secondaryLikes, 'Likes')}
            ${createStat(commentIcon, card.secondaryComments, 'Comments')}
          </div>
        </div>
        <div data-layout-section="upload">
          <p>${card.uploadLabel}</p>
          <p>${card.uploadDate}</p>
        </div>
      </div>
    </div>
  `
}

function createSkeletonCard() {
  return `
    <div class="flex items-center bg-white" data-layout-skeleton>
      <div class="mr-7 size-24 animate-pulse bg-zinc-200"></div>
      <div class="flex flex-1 justify-between">
        <div class="space-y-2">
          <div class="h-4 w-16 animate-pulse bg-zinc-200"></div>
          <div class="h-4 w-24 animate-pulse bg-zinc-200"></div>
        </div>
        <div class="space-y-2">
          <div class="h-4 w-20 animate-pulse bg-zinc-200"></div>
          <div class="h-4 w-24 animate-pulse bg-zinc-200"></div>
        </div>
        <div class="space-y-2">
          <div class="h-4 w-24 animate-pulse bg-zinc-200"></div>
          <div class="h-4 w-20 animate-pulse bg-zinc-200"></div>
        </div>
      </div>
    </div>
  `
}

function renderCards(cardsList, loadMoreButton) {
  cardsList.innerHTML = cards.slice(0, visibleCardsCount).map(createCard).join('')
  applyLayout(cardsList.dataset.activeLayout || 'rows')

  if (visibleCardsCount >= cards.length) {
    loadMoreButton.hidden = true
  }
}

export function initCards() {
  const cardsList = document.querySelector('[data-cards-list]')
  const loadMoreButton = document.querySelector('[data-load-more]')

  if (!cardsList || !loadMoreButton) {
    return
  }

  renderCards(cardsList, loadMoreButton)

  loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true
    cardsList.insertAdjacentHTML(
      'beforeend',
      Array.from({ length: LOAD_MORE_COUNT }, createSkeletonCard).join(''),
    )
    applyLayout(cardsList.dataset.activeLayout || 'rows')

    window.setTimeout(() => {
      visibleCardsCount = Math.min(visibleCardsCount + LOAD_MORE_COUNT, cards.length)
      renderCards(cardsList, loadMoreButton)
      loadMoreButton.disabled = false
    }, SKELETON_DELAY)
  })
}
