FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]