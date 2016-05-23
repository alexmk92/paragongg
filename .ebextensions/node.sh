#!/bin/bash
#
# Author: Jamie Shepherd (hello@jamie.sh)
#

apt-get install nodejs
apt-get install npm
cd /var/app/current
npm install
npm run build
