#!/bin/sh
echo "ENVIRONMENT=$ENVIRONMENT"
echo "PORT=${PORT:-3000}"

if [ "$COLLECTSTATIC" = "true" ]; then
    npm run export && echo "Generation completed successfully"
fi

if [ "$ENVIRONMENT" = "debug" ]; then
    sleep infinity
elif [ "$ENVIRONMENT" = "dev" ]; then
    npm run dev -- --port "$PORT"
elif [ "$ENVIRONMENT" = "prod" ]; then
    npm run export  # Runs `next build` + `next export`
    npx serve shop_front  -l "$PORT" --no-clipboard # Serves static files
elif [ "$ENVIRONMENT" = "static" ]; then
    npm run export && echo "Generation completed successfully"
fi
