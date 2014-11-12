#! /bin/bash

cd /var/www/holgerlissner
git add -A > /dev/null
git commit -am "Nightly commit on lasthein Digital Ocean droplet" > /dev/null
git push origin online > /dev/null



