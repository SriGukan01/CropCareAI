FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Create uploads directory structure
RUN mkdir -p uploads/original uploads/heatmaps

EXPOSE 5000

CMD ["node", "src/index.js"]
