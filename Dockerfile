FROM node

RUN apt-get update
RUN apt-get install -y libav-tools youtube-dl

COPY package.json package.json
RUN npm install

EXPOSE 9990

COPY . .
CMD ["npm","start"]
