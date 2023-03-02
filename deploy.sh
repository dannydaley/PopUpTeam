#!/bin/bash
(cd /app/kanban-server/; node bin/www) &
(cd /app/server; node server.js)