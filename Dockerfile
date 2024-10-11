FROM node:22-alpine as base

WORKDIR /app
RUN npm i -g pnpm

FROM base as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch && pnpm install --prod --offline

COPY . .
RUN pnpm build

FROM nginx:latest

EXPOSE 9000

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/docker-entrypoint.sh /

ARG CACHEBUST=1
COPY nginx/default.conf /etc/nginx/conf.d/

ENTRYPOINT ["/docker-entrypoint.sh"]
