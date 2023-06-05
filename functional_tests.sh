echo "Test script started"
cd /opt/rcm/be_spaceone/tests/functional
docker-compose -f docker-compose-bw.yml run runner
echo "Test script finished execution"
