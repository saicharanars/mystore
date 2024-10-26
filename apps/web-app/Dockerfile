FROM deps-base:latest AS builder
WORKDIR /app
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm nx run web-app:build --configuration=production 

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/web-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/web-app/.next/static ./dist/apps/web-app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-app/public ./apps/web-app/public



USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD [ "node", "apps/web-app/server.js"]

# CMD ["/bin/sh", "-c", "echo 'Hello World' && tail -f /dev/null"]
