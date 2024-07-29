#!/usr/bin/env bash
set -e
echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list

apt-get update -qq && apt-get install -y build-essential
