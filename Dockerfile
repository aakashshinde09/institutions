FROM --platform=amd64 node:20-alpine as builder

WORKDIR /app

ARG build_env

COPY ./ .
RUN npm ci --production=false \
  && npm run build:$build_env

FROM --platform=amd64 node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY ./ .

RUN npm ci --omit=dev

EXPOSE 3000
CMD npm run start
