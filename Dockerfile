# Use Node.js base image
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm init playwright@latest



# Copy the rest of the application code
COPY . .

# Install browser binaries for Playwright
RUN npx playwright install
RUN npx playwright install-deps

# Set the PATH environment variable to include the directory where browser binaries are located
ENV PATH="/app/node_modules/.bin:${PATH}"

# Run the Playwright tests with the 'env:test' script
CMD ["npm", "run", "env:test"]
