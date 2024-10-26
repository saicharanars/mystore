FROM deps-base:latest AS builder
WORKDIR /app
COPY . .

RUN pnpm nx run ecommerce-buyer-app-backend:build --configuration=production 

FROM node:20-bookworm-slim
WORKDIR /final
COPY --from=builder /app/dist/apps/ecommerce-buyer-app-backend ./


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

RUN chown -R node:node /final

USER node
EXPOSE 3001
CMD [ "node", "main.js" ]
# CMD ["/bin/sh", "-c", "echo 'Hello World' && tail -f /dev/null"]
