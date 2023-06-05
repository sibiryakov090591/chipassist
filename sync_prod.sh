#!/bin/bash
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -p22" --progress --exclude '.git' --exclude '__pycache__' --exclude '.DS_Store' ./ root@5.9.23.174:/var/www/html
