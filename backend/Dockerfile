# Production-Ready Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Install sharp specific dependencies for Alpine if needed, but 'npm ci' usually handles prebuilts.
# Explicitly adding sharp if platform issues arise, but standard install usually works.

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
