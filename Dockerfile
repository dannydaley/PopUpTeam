FROM node:18-bullseye

RUN mkdir /app/

WORKDIR /app/

RUN chown node:node /app/

USER node

COPY --chown=node:node server/ /app/server/
COPY --chown=node:node kanban-server/ /app/kanban-server/

COPY --chown=node:node deploy.sh /app/deploy.sh

WORKDIR /app/kanban-server/

RUN npm ci


WORKDIR /app/server/

RUN npm ci

USER root
RUN chown node:node -R /app/server/public/images

# Ready to run
WORKDIR /app/

EXPOSE 3001 3050

CMD ["./deploy.sh"]
