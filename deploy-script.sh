#!/bin/bash
mkdir -p /home/ubuntu/logs
exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>/home/ubuntu/leloir_logs/"$(date -d "today" +"%Y%m%d%H%M")"-log.out 2>&1
# Everything below will go to the log file:

echo "$(date) : FRONTEND deploy triggered."
echo "$(date) : part 1 - Setting up for deploy"

cd /home/ubuntu/leloir-orchestrator || exit

echo "$(date) : part 2 - Stop previous execution"
docker-compose down --rmi all

echo "$(date) : part 3 - Clean docker env"
docker system prune -f

echo "$(date) : part 4 - Pulling new images"
eval "$(aws ecr get-login --region us-east-2 --no-include-email)"
docker-compose pull

echo "$(date) : part 5 - Pulling new images"
docker-compose up -d