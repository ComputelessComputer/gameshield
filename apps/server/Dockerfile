FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.14.2 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/server/package.json ./apps/server/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/server ./apps/server
COPY packages/shared ./packages/shared
COPY tsconfig.json ./

# Build shared package first
RUN pnpm --filter @gameshield/shared build

# Build server
RUN pnpm --filter @gameshield/server build

# Production stage
FROM node:20-alpine AS production

RUN corepack enable && corepack prepare pnpm@9.14.2 --activate

WORKDIR /app

# Copy built files
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-workspace.yaml ./
COPY --from=base /app/pnpm-lock.yaml* ./
COPY --from=base /app/apps/server/package.json ./apps/server/
COPY --from=base /app/apps/server/dist ./apps/server/dist
COPY --from=base /app/packages/shared/package.json ./packages/shared/
COPY --from=base /app/packages/shared/dist ./packages/shared/dist

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "apps/server/dist/index.js"]
