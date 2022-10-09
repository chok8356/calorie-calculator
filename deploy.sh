#!/usr/bin/env sh

set -e

pnpm build

cd dist

git init
git checkout -b master
git add -A -f
git commit -m 'deploy'

git push -f git@github.com:chok8356/calorie-calculator.git master:gh-pages

cd -
