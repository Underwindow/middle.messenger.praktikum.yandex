FROM node:14.15.1
    
RUN apt-get install -y --no-install-recommends && \
    apt-get update -y  && rm -rf /var/lib/apt/lists/*


RUN rm -rf /var/www/html/* && \
    mkdir -p /var/www/html/

COPY . /var/www/html

WORKDIR /var/www/html

RUN npm install && npm run build

EXPOSE 3000
CMD node server.js