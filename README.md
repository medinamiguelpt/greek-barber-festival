# 8th Greek Barber Festival — Official Website

Website for the **8th Greek Barber Festival**, taking place **April 26–27, 2026** at Εργοστάσιο Κλωσταί Πεταλούδα, Athens, Greece.

Built with Next.js 15 (static export), React 19, TypeScript, and Tailwind CSS v4. Supports Greek and English.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm (comes with Node.js)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/medinamiguelpt/greek-barber-festival.git
cd greek-barber-festival

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `/out`) |
| `npm run start` | Serve the production build locally |

---

## Project Structure

```
src/
├── app/                  # Pages (Next.js App Router)
│   ├── page.tsx          # Homepage
│   ├── competition/      # Competition categories & rules
│   ├── tickets/          # Ticket types
│   ├── program/          # Event program & main stage
│   ├── location/         # Venue info
│   ├── photos/           # Photo gallery
│   ├── sponsors/         # Sponsors
│   └── contact/          # Contact page
├── components/           # Shared UI components
└── i18n/                 # Greek / English translations
public/                   # Static assets (images, icons)
```

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) — static export
- **UI:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts:** Oswald + Source Sans 3 (Google Fonts)
- **i18n:** Custom Greek/English language switcher
