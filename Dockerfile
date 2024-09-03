ARG PNPM_VERSION=9.6.0

FROM node:bookworm

ENV NODE_ENV development
RUN npm config set registry http://registry.npmjs.org/ --global


RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --verbose --fetch-timeout=60000

COPY . .

EXPOSE 3000 3001

CMD ["pnpm", "run", "dev"]
