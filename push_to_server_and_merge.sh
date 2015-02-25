#!/bin/bash

cd /Users/rala/PROJECTS/holgerlissner
git push server master
ssh vagrant@128.199.39.224 "cd /var/www/holgerlissner; git merge master"

