# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Create uploads directory
RUN mkdir -p /app/uploads && \
    chown -R node:node /app/uploads && \
    chmod 755 /app/uploads

# Copy backend package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY . .

# Define environment variables with defaults
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=""
ENV JWT_SECRET=""

# Expose the port Railway will use
EXPOSE ${PORT}

# Command to run the application
CMD ["node", "server.js"] 