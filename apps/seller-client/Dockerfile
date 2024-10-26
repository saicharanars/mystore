FROM deps-base:latest AS builder
WORKDIR /app
COPY . .


RUN pnpm nx run seller-client:build --configuration=production 




FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/apps/seller-client .
COPY apps/seller-client/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

