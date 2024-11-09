#!/bin/sh
echo "ENVIRONMENT=$ENVIRONMENT"
echo "PORT=$PORT"
if [ "$COLLECTSTATIC" = "True" ]; then
    npm run export && echo "Generation completed successfully"
fi
if [ "$ENVIRONMENT" = "debug" ]; then
    sleep infinity
elif [ "$ENVIRONMENT" = "dev" ]; then
    npm run dev -- --port $PORT
elif [ "$ENVIRONMENT" = "prod" ]; then
    npm run build
    npm run export
    npx serve out -p $PORT
fi
