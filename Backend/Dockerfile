FROM node:20-alpine

WORKDIR /app

# copy only package files from Backend
COPY Backend/package*.json ./
RUN npm ci --omit=dev

# copy the rest of the Backend folder
COPY Backend/. ./

ENV NODE_ENV=production
EXPOSE 8000

CMD ["npm", "start"]