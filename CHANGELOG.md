# Changelog — 2026-04-30

## Redesign: BMW M Style + Dark Mode + Bug Fixes + Best Practices

### เนื้อหา (Content)
- อัปเดตตำแหน่ง: นักศึกษา → **DevOps Engineer** ที่ AskMe Solutions & Consultants Co., Ltd.
- เพิ่ม Experience 2 รายการ: DevOps Intern (Jun–Oct 2025) และ DevOps Engineer (Nov 2025–ปัจจุบัน)
- เพิ่มผลงาน Internship: n8n Automated Telegraf.conf และ Zabbix stack (500 hosts, โรงพยาบาลกรุงเทพ)
- อัปเดต Education: RMUTL `2022 - Present` → `2022 - 2025`

---

### Visual Redesign: BMW M Color System

ใช้ palette จาก BMW M Brand:
| Token | สี |
|---|---|
| Light Blue | `#81C4FF` |
| Azure Palace | `#16588E` |
| Funky Red | `#E7222E` |

**Signature M-Stripe** (gradient 3 สี) ถูกใช้ใน:
- Border ขวา sidebar
- Underline ใต้ชื่อ profile
- Accent แนวตั้งซ้าย section heading
- เส้น timeline vertical
- Top stripe บน cards ตอน hover

---

### Dark Mode

- ปุ่ม toggle ใน sidebar สลับ Light / Dark
- Inline `<script>` ใน `<head>` อ่าน `localStorage` + `prefers-color-scheme` ก่อน CSS โหลด — ป้องกัน FOUC
- Preference บันทึกใน `localStorage`
- Semantic CSS tokens ที่เปลี่ยนตาม theme:

| Token | Light | Dark |
|---|---|---|
| `--surface-page` | `#f4f6f9` | `#0d1620` |
| `--surface-card` | `#ffffff` | `#182532` |
| `--color-fg` | `#0a1929` | `#e8ecf1` |
| `--color-fg-muted` | `#5a6a7a` | `#8a9aa8` |

---

### Carbon Fiber Pattern

- กำหนดเป็น CSS variable `--carbon-fiber` (6-layer linear-gradient, tile 20×20px)
- ใช้กับ **Skills cards** ทุกโหมด (เห็นชัดเจน)
- ใช้เป็น **body background** ใน dark mode

---

### Bug Fixes

| Bug | สาเหตุ | วิธีแก้ |
|---|---|---|
| Scroll spy highlight ผิด section | `scrollY` ไม่ถึง threshold ของ last section เพราะ page scroll หมดแล้ว | เพิ่ม `isAtBottom` edge case → บังคับเลือก section สุดท้าย |
| `highlightCurrentSection` ไม่ทำงานตอนโหลด | ไม่มี initial call | เพิ่ม call หลัง DOM ready + `hashchange` listener |
| Timeline line ยาวเกิน dot สุดท้าย | `height: 48%` hardcode สำหรับ 2 items | เปลี่ยนเป็น `calc(100% - 40px)` |

---

### Best Practices: HTML

| รายการ | รายละเอียด |
|---|---|
| `crossorigin="anonymous"` | explicit value บน font preconnect |
| `aria-labelledby` | ทุก `<section>` ชี้ไปที่ `<h2>` ของตัวเอง |
| `<h2 class="sr-only">About</h2>` | About section มี heading สำหรับ screen reader |
| `aria-hidden="true"` | ทุก icon decorative (`<i>`) |
| `aria-label` | ปุ่ม menu toggle, theme toggle, work card link |
| `loading="lazy"` | work images + MUI logo |
| `loading="eager"` | profile image (above fold) |
| `download="RESUME-Patthanan.pdf"` | ระบุชื่อไฟล์ตอน download |
| `datetime="2022-06-07"` | แก้ format ผิด (ขาด leading zero) |
| `datetime="2024-03-14"` | แก้ datetime ไม่ตรงกับ text |
| ลบ `href="#"` | Solar Tracking และ Smart Drop ไม่มี URL จริง → ลบ `<a>` wrapper |
| แทน GitHub `<img>` CDN | ใช้ `<i class="bx bxl-github">` (Boxicons ที่โหลดอยู่แล้ว) |
| Typo fix | "VocationalEducation" → "Vocational Education" |
| `role="presentation"` | sidebar overlay div |

---

### Best Practices: CSS

| รายการ | รายละเอียด |
|---|---|
| `.sr-only` | Utility class ซ่อนจาก visual แต่ screen reader อ่านได้ |
| `:focus-visible` | Keyboard navigation ครบทุก interactive element |
| `@media (prefers-reduced-motion)` | ปิด transitions/animations ตาม OS preference |
| `@media print` | ซ่อน sidebar, แสดง URL ของ links, break-inside avoid |
| `-webkit-backdrop-filter` | Safari compatibility |
| `-webkit-user-select` | Safari compatibility |

---

### Best Practices: TypeScript

| รายการ | รายละเอียด |
|---|---|
| `scrollTimer: ... \| undefined` | ประกาศ type ถูกต้อง ไม่ implicit undefined |
| Type assertion order | `(getAttribute() \|\| "light") as Theme` — null ก่อน cast |
| Cache `sections` | `querySelectorAll` ครั้งเดียวนอก scroll loop |
| `body.style.overflow = ""` | ลบ inline style แทนการ set `"auto"` |
| `window.scrollY` | ใช้ modern API (ไม่ใช้ deprecated `pageYOffset`) |

---

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
