#!/usr/bin/env bash

path=`dirname $0`

find $path/.. -name "node_modules" -exec rm -rf '{}' +
echo 'All done.'
