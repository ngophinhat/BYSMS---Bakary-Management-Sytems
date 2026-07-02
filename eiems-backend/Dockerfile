# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Cài deps trước để tận dụng cache layer
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

# Copy toàn bộ source và build
COPY . .
RUN npx prisma generate
RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Chỉ cài production deps
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npm cache clean --force

# Copy code đã build + prisma client đã generate từ stage builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["node", "dist/main"]
