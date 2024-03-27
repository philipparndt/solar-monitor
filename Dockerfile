FROM node:18.20-alpine
COPY app/dist /opt/app/
WORKDIR /opt/app/

CMD ["node", "index.js", "/var/lib/solarmonitor/config.json"]
