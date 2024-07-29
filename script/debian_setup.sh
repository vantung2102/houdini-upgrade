#!/usr/bin/env bash
set -e

curl -sL https://deb.nodesource.com/setup_9.x | bash -

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs postgresql-9.6 default-jre
npm install npm@^6 -g