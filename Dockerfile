# Stage 1: Build
FROM node:23 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

RUN yarn build

# Stage 2: Serve
FROM node:23

WORKDIR /app

# Copy dependencies and build artifacts from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["yarn", "start"]
