import flatpickr from 'flatpickr'
import calendarNextIcon from '../assets/icons/calendar-next.svg'
import calendarPrevIcon from '../assets/icons/calendar-prev.svg'

export function initDatepickers() {
  document.querySelectorAll('[data-datepicker]').forEach((datepicker) => {
    const input = datepicker.querySelector('[data-datepicker-input]')
    const clearButton = datepicker.querySelector('[data-datepicker-clear]')
    const toggleButton = datepicker.querySelector('[data-datepicker-toggle]')

    if (!input || !clearButton || !toggleButton) {
      return
    }

    const calendar = flatpickr(input, {
      allowInput: true,
      dateFormat: 'd_m_Y',
      defaultDate: input.value || null,
      disableMobile: true,
      locale: {
        weekdays: {
          shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
      },
      monthSelectorType: 'static',
      nextArrow: `<img class="flatpickr-arrow-icon" src="${calendarNextIcon}" alt="">`,
      prevArrow: `<img class="flatpickr-arrow-icon" src="${calendarPrevIcon}" alt="">`,
    })

    clearButton.addEventListener('click', () => {
      calendar.clear()
      input.focus()
    })

    toggleButton.addEventListener('click', () => {
      calendar.open()
    })
  })
}
