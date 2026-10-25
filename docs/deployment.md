# RADHA 2027 — Deployment, Rollback & Infrastructure Guide

## 1. Hosting Architecture Overview

The RADHA 2027 conference website is engineered as a high-performance, standards-compliant static web application. It requires zero server-side build steps or runtime node dependencies to serve, ensuring virtually 100% uptime, zero vulnerability surface, and ultra-fast loading over low-bandwidth academic networks.

---

## 2. Deployment Targets

### Target A: Institutional DTU Linux/Apache/Nginx Server
1. Copy project root files to the document root (e.g. `/var/www/html/radha2027/`).
2. Ensure file permissions: `chmod -R 755 /var/www/html/radha2027/`.
3. Configure Nginx or Apache with HTTPS enabled via Let's Encrypt or institutional SSL certificate.
4. Set caching headers for static assets in `assets/images/` and `css/`:
   ```nginx
   location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
       expires 30d;
       add_header Cache-Control "public, no-transform";
   }
   ```

### Target B: GitHub Pages / Cloudflare Pages / Vercel / Netlify
1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of RADHA 2027 conference website"
   ```
2. For GitHub Pages: Push to `main` branch and configure GitHub Pages from repo settings -> Pages -> Source: Deploy from branch `/root`.
3. For Cloudflare / Vercel: Connect repository; build command: *none*; publish directory: `./`.

---

## 3. Environment & Security Configuration

- **HTTPS Requirement**: All production traffic must be served over TLS 1.3/HTTPS.
- **Content Security Policy (CSP)**:
  ```http
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com;
  ```

---

## 4. Rollback and Disaster Recovery

- **Version Control**: Every update should be tagged with a git semver tag (e.g., `v1.0.0`, `v1.0.1`).
- **Rollback Procedure**: To revert to a prior state on the institutional server:
  ```bash
  git checkout tags/v1.0.0 -b rollback-release
  ```
- **Backup**: Daily backups of registration database/form submissions should be archived offsite if an automated backend endpoint is attached.
