FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 9000

CMD ["npm", "run", "dev"]
