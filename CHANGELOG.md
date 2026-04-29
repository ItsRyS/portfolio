# Changelog — 2026-04-29

## Migration: JavaScript → TypeScript

### เปลี่ยนแปลง
- ลบ `src/main.js` → แทนด้วย `src/main.ts` พร้อม strict types ครบ
- เพิ่ม `tsconfig.json` (strict, isolatedModules, moduleResolution: bundler)
- อัปเดต `index.html` ชี้ script ไปที่ `main.ts`
- อัปเดต `package.json` — build script เป็น `tsc --noEmit && vite build`

### TypeScript types ที่เพิ่ม
| Element | Type |
|---|---|
| menu button | `HTMLButtonElement` |
| sidebar / overlay | `HTMLElement` |
| nav links | `NodeListOf<HTMLAnchorElement>` |
| scroll timer | `ReturnType<typeof setTimeout>` |

---

## Upgrade: เป็น Latest Versions

| Package | เดิม | ใหม่ |
|---|---|---|
| Vite | 6.3.1 | **8.0.10** |
| TypeScript | — | **6.0.3** |
| Node (Docker) | — | **24-alpine** |
| nginx (Docker) | — | **1.30-alpine** |

### Breaking changes ที่แก้
- **Vite 8**: `build.rollupOptions` → `build.rolldownOptions` (Rolldown engine)
- **TypeScript 6**: เพิ่ม `isolatedModules`, `useDefineForClassFields` รองรับ defaults ใหม่

---

## เพิ่ม: Docker + Nginx Deployment

### ไฟล์ใหม่
| ไฟล์ | หน้าที่ |
|---|---|
| `Dockerfile` | Multi-stage build: Node 24 build → nginx 1.30 serve |
| `.dockerignore` | กัน node_modules / .git / dist ออกจาก build context |
| `nginx.conf` | Static serve + gzip + cache headers + security headers |
| `docker-compose.yml` | Port 80, restart policy, health check |
| `vite.config.ts` | Build config พร้อม asset hashing |

### nginx best practices
- `server_tokens off` — ซ่อน version
- `gzip_comp_level 6` + types ครบ
- Cache 1 ปีสำหรับ assets (immutable)
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- `HEALTHCHECK` บน Docker container

---

## Deploy Flow (Pi5)

```
Local
  git commit + push
       ↓
Pi5
  git pull
  docker compose up -d --build
       ↓
  Node 24 → npm ci → vite build → dist/
       ↓
  nginx 1.30 serve :80
```
