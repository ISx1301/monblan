import colsActiveIcon from '../assets/icons/cols-active.svg'
import colsNotActiveIcon from '../assets/icons/cols-not-active.svg'
import rowsActiveIcon from '../assets/icons/rows-active.svg'
import rowsNotActiveIcon from '../assets/icons/rows-not-active.svg'

const layoutIcons = {
  cols: {
    active: colsActiveIcon,
    inactive: colsNotActiveIcon,
  },
  rows: {
    active: rowsActiveIcon,
    inactive: rowsNotActiveIcon,
  },
}

export function applyLayout(activeLayout) {
  const layoutContent = document.querySelector('[data-layout-content]')

  layoutContent?.setAttribute('data-active-layout', activeLayout)

  if (layoutContent) {
    layoutContent.className =
      activeLayout === 'rows'
        ? 'flex flex-col gap-2'
        : 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'
  }

  document.querySelectorAll('[data-layout-card]').forEach((card) => {
    const image = card.querySelector('[data-layout-image]')
    const content = card.querySelector('[data-layout-card-content]')
    const stats = card.querySelectorAll('[data-layout-stats]')
    const todaySection = card.querySelector('[data-layout-section="today"]')
    const dateSection = card.querySelector('[data-layout-section="date"]')
    const uploadSection = card.querySelector('[data-layout-section="upload"]')

    card.className =
      activeLayout === 'rows'
        ? 'flex w-full items-center bg-white font-sans text-sm font-medium lg:pr-20 lg:text-base'
        : 'flex w-full flex-col bg-white font-sans text-sm font-medium'

    if (image) {
      image.src =
        activeLayout === 'rows' ? image.dataset.layoutRowsImage : image.dataset.layoutColsImage
      image.className =
        activeLayout === 'rows'
          ? 'mr-3 size-24 shrink-0 object-cover lg:mr-7'
          : 'h-44 w-full object-cover'
    }

    if (content) {
      content.className =
        activeLayout === 'rows'
          ? 'flex min-w-0 flex-1 justify-between gap-3'
          : 'grid grid-cols-2 gap-x-4 gap-y-3 px-2 py-3 text-sm'
    }

    stats.forEach((stat) => {
      stat.className = activeLayout === 'rows' ? 'flex gap-2 lg:gap-5' : 'flex flex-col gap-1'
    })

    if (todaySection) {
      todaySection.className = activeLayout === 'rows' ? 'min-w-0' : ''
    }

    if (dateSection) {
      dateSection.className = activeLayout === 'rows' ? 'min-w-0' : ''
    }

    if (uploadSection) {
      uploadSection.className =
        activeLayout === 'rows' ? 'min-w-0 text-right' : 'col-span-2 flex justify-between'
    }
  })
}

export function initLayoutSwitcher() {
  const switcher = document.querySelector('[data-layout-switcher]')

  if (!switcher) {
    return
  }

  const buttons = switcher.querySelectorAll('[data-layout-option]')

  function setLayout(activeLayout) {
    applyLayout(activeLayout)

    buttons.forEach((button) => {
      const layout = button.dataset.layoutOption
      const icon = button.querySelector('[data-layout-icon]')
      const isActive = layout === activeLayout

      button.setAttribute('aria-pressed', String(isActive))

      if (icon && layoutIcons[layout]) {
        icon.src = isActive ? layoutIcons[layout].active : layoutIcons[layout].inactive
      }
    })
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setLayout(button.dataset.layoutOption)
    })
  })

  setLayout('rows')
}
