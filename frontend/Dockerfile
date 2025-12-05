# ---------- BUILDER ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RAWG_API_KEY

# Make them available during build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RAWG_API_KEY=$NEXT_PUBLIC_RAWG_API_KEY

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- RUNNER ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 5173

CMD ["npm", "run", "start", "--", "-p", "5173"]
