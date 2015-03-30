#!/bin/bash
if [ -e "../rPay.tar.gz" ]
    then
     rm "../rPay.tar.gz" 
fi

if [ -e "rPay.tar.gz" ]
    then
     rm "rPay.tar.gz" 
fi

tar -pczf ../rPay.tar.gz . --exclude "./node_modules" --exclude "./.git" --exclude "./.sass-cache"
