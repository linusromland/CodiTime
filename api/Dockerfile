FROM node:18 as api

WORKDIR /app

# Copy the source code
COPY . .

# Install the dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose the port 3000
EXPOSE 3000

# Start nginx & api
CMD npm run start:prod