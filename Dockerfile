# ========================================
# Base Image
# ========================================
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

# ========================================
# Dependencies Stage
# ========================================
FROM base AS deps

# Dépendances nécessaires pour sharp / prisma / node-gyp
RUN apk add --no-cache python3 make g++ git

# Copier uniquement les fichiers de dépendances (meilleur cache)
COPY package.json package-lock.json ./

# ✅ Utiliser npm ci (et non npm install)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ========================================
# Builder Stage
# ========================================
FROM base AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ARG COOLIFY_URL
ENV NEXT_PUBLIC_BASE_URL=${COOLIFY_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Nettoyer ancien build si présent
RUN rm -rf .next

# ✅ Bonne commande
RUN npm run build

# ========================================
# Runner Stage
# ========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

# curl pour healthcheck
RUN apk add --no-cache libc6-compat curl

# User non-root (sécurité)
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copier uniquement le standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Healthcheck compatible Coolify
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
