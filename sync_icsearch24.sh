#!/bin/bash
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p22" --progress --exclude '.git' --exclude '.DS_Store' ./dist/ root@server2.vsdg.ru:/opt/icsearch24.ru/dist/
