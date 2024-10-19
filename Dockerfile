FROM node:16-alpine

# Install system dependencies as root
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Set working directory
WORKDIR /app

# Set ownership of /app directory to node before switching users
RUN chown -R node:node /app

# Switch to non-root user 'node' for installing dependencies and app setup
USER node

# Copy package.json and package-lock.json (if available) and install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# Copy the rest of the application files as 'node'
COPY --chown=node:node . .

# Ensure run.sh is executable
RUN chmod +x ./run.sh

# Set entry point and command
ENTRYPOINT ["sh", "./run.sh"]
CMD ["dev", "3000"]
