FROM node

ADD . /var/www/faas/bold
RUN echo "[program:faas-bold-server]" >> /etc/supervisord.conf
RUN echo "command=/usr/bin/node /var/www/faas/bold/api.js" >> /etc/supervisord.conf
RUN echo "redirect_stderr=true" >> /etc/supervisord.conf

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/supervisord", "-n"]
