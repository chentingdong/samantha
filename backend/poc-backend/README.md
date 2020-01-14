# To use stackery to deploy
stackery deploy --strategy local --stack-name stackery-quickstart --env-name test --aws-profile default

# ssh tunnel to VPC via Bastion
### in one terminal window
ssh -v -N -L 3306:stackery-quickstart-test-database-puuqrphhie0w.cluster-ctu5ocqkkg6d.us-east-1.rds.amazonaws.com:3306 54.227.100.187

### in a new terminal window
mysql -h 127.0.0.1 -u root -p password
