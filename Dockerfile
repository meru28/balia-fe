# Stage 1: Build
FROM node:23 AS builder

WORKDIR /src/app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN rm -rf ./.next/
RUN rm -rf ./node_modules/ && yarn cache clean
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Ensure the build command runs in a clean environment
RUN yarn build || { echo "Build failed. Check the application code or configuration."; exit 1; }

# Stage 2: Serve
FROM node:23

WORKDIR /src/app

# Copy dependencies and build artifacts from the builder stage
COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package.json ./package.json
COPY --from=builder /src/app/yarn.lock ./yarn.lock
COPY --from=builder /src/app/.next ./.next

EXPOSE 3000
CMD ["yarn", "start"]
