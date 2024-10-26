FROM deps-base:latest AS builder
WORKDIR /app
COPY . .
RUN pnpm nx run seller-api:build --configuration=production 

FROM node:20-bookworm-slim
WORKDIR /final
COPY --from=builder /app/dist/apps/seller-api ./


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN chown -R node:node /final/apps/seller-api/src/

USER node
EXPOSE 3003
CMD [ "node", "main.js" ]