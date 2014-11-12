#! /bin/bash
# Sender ændringer i online kode til github hver nat

cd /var/www/holgerlissner
git add -A > /dev/null 2>&1
git commit -am "Nightly commit on lasthein Digital Ocean droplet" > /dev/null 2>&1
git push origin online > /dev/null 2>&1



