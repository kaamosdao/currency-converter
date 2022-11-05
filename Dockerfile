FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 4242

EXPOSE $PORT

CMD ["make", "serve"]
