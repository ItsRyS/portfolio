# Rys Portfolio

Personal portfolio website for Patthanan Jaichuai (PJ.Nut), built with vanilla TypeScript and Vite.

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Styling | Vanilla CSS3 |
| Web Server | Nginx 1.30 |
| Container | Docker (Node 24 build → nginx:alpine serve) |

## Prerequisites

- [Node.js](https://nodejs.org/) >= 24
- [Docker](https://www.docker.com/) (for deployment)

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Type-check + production build |
| `npm run typecheck` | Run TypeScript type check only |
| `npm run preview` | Preview production build locally |

## Production Build

```bash
npm run build
# Output → dist/
```

## Deploy with Docker (Raspberry Pi 5)

```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

Serves on port `80`. Container includes a health check on `/`.

## Project Structure

```
portfolio/
├── src/
│   ├── main.ts          # App logic (sidebar, scroll spy, smooth scroll)
│   ├── style.css        # Global styles
│   └── assets/img/      # Project images
├── public/
│   └── RESUME-Patthanan.pdf
├── index.html
├── vite.config.ts
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Author

**Patthanan Jaichuai** — [github.com/ItsRyS](https://github.com/ItsRyS) · [linkedin.com/in/ci2p-nut](https://linkedin.com/in/ci2p-nut)
