#!/bin/sh

file=github-whitespace.zip
rm -f $file

cd src
zip -r ../$file ./*
cd ..
