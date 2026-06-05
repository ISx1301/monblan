# Monblan Project

Responsive Vanilla JavaScript profile/gallery page built with Vite and Tailwind CSS.

## Tech Stack

- Vite
- Vanilla JavaScript ES modules
- Tailwind CSS v4
- Flatpickr datepicker
- Prettier
- Local WOFF2 fonts

## Requirements

- Node.js
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Preview Production Build

```bash
npm run preview
```

## Formatting

Format all project files:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Project Structure

```text
src/
  assets/
    fonts/
    icons/
    images/
  js/
    app.js
    cards.js
    datepickers.js
    layout-switcher.js
    main.js
    mock-data.js
  styles/
    datepicker.css
    style.css
```

## Engineering Highlights

- Mobile-first layout with desktop refinements through `lg:*` Tailwind utilities.
- CSS is loaded in the document head to avoid initial unstyled header flicker.
- Gallery cards are rendered from mock data instead of hardcoded HTML.
- Rows and columns layouts are switched through JavaScript while reusing the same card data.
- `Load more` renders the first 8 cards initially, then appends 8 more cards with a short skeleton loading state.
- Date inputs use Flatpickr instead of native `input type="date"`.
- Local fonts are loaded with `@font-face` and WOFF2 assets.
- Theme values are centralized in Tailwind v4 CSS tokens.

## Deployment

This is a Vite app, so any static hosting service works after running:

```bash
npm run build
```
