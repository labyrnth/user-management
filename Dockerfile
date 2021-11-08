FROM node:latest
WORKDIR /PROJECT-USER
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm" ,"start"]

