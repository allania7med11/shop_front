#!/bin/sh
echo "ENVIRONMENT=$ENVIRONMENT"
echo "PORT=${PORT:-3000}"

if [ "$COLLECTSTATIC" = "True" ]; then
    npm run export && echo "Generation completed successfully"
fi

if [ "$ENVIRONMENT" = "debug" ]; then
    sleep infinity
elif [ "$ENVIRONMENT" = "dev" ]; then
    npm run dev -- --port "$PORT"
elif [ "$ENVIRONMENT" = "prod" ]; then
    npm run export  # Runs `next build` + `next export`
    npx serve out -l "$PORT"  # Serves static files
fi
