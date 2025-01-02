FROM node:20-alpine
WORKDIR /app

# Copy the application dependencies
COPY package*.json .
COPY tsconfig*.json .

# Install the application
RUN npm install

# Copy in the source code
COPY . .
ENV OLLAMA_HOST=http://host.docker.internal:11434
EXPOSE 3002

# Run the application
CMD ["npm", "run", "start:dev"]