#!/bin/bash

echo "Running startup.sh..."
echo "check if migrations should be run"
echo "RUN_MIGRATIONS: "
echo $RUN_MIGRATIONS

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running migrations..."
  npm run db:migrate:dev
fi

echo "check if seeds should be run"
echo "RUN_DEV_SEEDS: $RUN_DEV_SEEDS"
if [ "$RUN_DEV_SEEDS" = "true" ]; then
  echo "Running seeds..."
  npm run seed:dev
fi


npm run start