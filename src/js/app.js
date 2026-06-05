import { initCards } from './cards.js'
import { initDatepickers } from './datepickers.js'
import { initLayoutSwitcher } from './layout-switcher.js'

export function app() {
  initCards()
  initDatepickers()
  initLayoutSwitcher()
}
