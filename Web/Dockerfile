# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY src ./src
COPY public ./public
COPY index.html .
COPY vite.config.js .
COPY nginx.conf .

# Build the app with environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

ARG VITE_SIGNALING_SERVER_URL
ENV VITE_SIGNALING_SERVER_URL=${VITE_SIGNALING_SERVER_URL}

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Create directory for uploads
RUN mkdir -p /usr/share/nginx/html/uploads && \
    chmod 755 /usr/share/nginx/html/uploads

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Railway will use
EXPOSE ${PORT:-80}

# Start nginx with environment variable substitution
CMD /bin/sh -c "envsubst '\$PORT \$API_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && \
    mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'" 