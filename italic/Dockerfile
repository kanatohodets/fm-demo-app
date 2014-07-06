FROM node

ADD . /var/www/faas/italic
WORKDIR /var/www/faas/italic
RUN npm install

EXPOSE 4000

ENTRYPOINT ["node", "api.js"]
