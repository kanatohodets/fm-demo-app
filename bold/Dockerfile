FROM node

ADD . /var/www/faas/bold
WORKDIR /var/www/faas/bold
RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "api.js"]
