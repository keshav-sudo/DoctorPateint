#Build Stage

FROM  node:20-alpine

WORKDIR /app


COPY package* ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . . 

RUN npm run build

EXPOSE 5000

CMD ["node" , "dist/index.js"]