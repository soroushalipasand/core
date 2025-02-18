# Stage 1: Build the application
FROM node:22.12.0-alpine AS build

WORKDIR /app
# Install OpenSSL
RUN apk add --no-cache openssl
# Copy package files and install dependencies (include devDependencies for build)
COPY package*.json ./
RUN npm install

# Copy the prisma folder to ensure the schema is available
COPY prisma ./prisma

# Copy the rest of the application code
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Prune devDependencies to reduce size
RUN npm prune --production

# Remove unnecessary files after the build
RUN rm -rf ./src ./tests

# Stage 2: Run the application
FROM node:22.12.0-alpine AS runtime

WORKDIR /app
# Install OpenSSL
RUN apk add --no-cache openssl

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/
COPY --from=build /app/prisma /app/prisma  
COPY .env /app/.env
# If you're using any environmental variables, set them here
ENV LIBSSL_PATH=/usr/lib
ENV NODE_ENV=production
ENV PORT=7000
ENV HOSTNAME="0.0.0.0"

# Expose the application port
EXPOSE 7000

# Use a non-root user to run the app for better security
RUN adduser -D -u 1001 expressuser
RUN chown -R expressuser /app/node_modules
USER expressuser

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
