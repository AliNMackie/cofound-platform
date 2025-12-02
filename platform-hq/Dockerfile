FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------------------------------------------------------------------------
# 1. Copy dependencies (Adjusted for Root Context)
# ---------------------------------------------------------------------------
# FIX: Prepend 'platform-hq/' to the source paths
COPY platform-hq/package.json platform-hq/yarn.lock* platform-hq/package-lock.json* platform-hq/pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# ---------------------------------------------------------------------------
# 2. Copy application code (Adjusted for Root Context)
# ---------------------------------------------------------------------------
# FIX: Copy only the platform-hq folder contents into /app
COPY platform-hq/ .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# ---------------------------------------------------------------------------
# 3. Copy Assets
# ---------------------------------------------------------------------------
# FIX: Commented out because 'public' folder is missing in your source.
# Uncomment this if you add a 'public' folder later (for images/icons).
# COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# IMPORTANT: You MUST add { output: 'standalone' } to your next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]