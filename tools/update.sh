#!/usr/bin/env bash

path=`dirname $0`

node $path/lib/update.js $1
echo 'All done.'
