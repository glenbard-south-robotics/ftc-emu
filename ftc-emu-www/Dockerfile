# --- Stage: Node Frontend ---
FROM node:20-slim

# Use pnpm if you prefer; otherwise npm works
RUN npm install -g pnpm

WORKDIR /web

# Copy only package.json first for caching
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the frontend
COPY . .

# Expose dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["pnpm", "run", "dev"]
