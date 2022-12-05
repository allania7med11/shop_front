#!/bin/sh
echo "envs $1 $2"
if [ "$1" = "dev" ]; then
    npm run dev
else
    npm run build
    npm run export
    npx serve out -p $2
fi
