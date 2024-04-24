ARG NODE_VERSION=latest
FROM node:${NODE_VERSION}
ENV HOSTNAME=http://localhost/ PORT=8080 
WORKDIR /
COPY . .
RUN npm ci --omit=dev && npm run build --if-present
ENTRYPOINT [ "node" ]
CMD [ "index.js" ]