- invoke local with inline data
sls invoke local -f suggest --data '{ "pathParameters": { "utterance": "co" } }'

- invoke local with data in a file
sls invoke local -f suggest --path data.json

- testing deployment with curl
curl https://xwkk9zmwbj.execute-api.us-east-1.amazonaws.com/dev/suggest/co

- testing solr search
http://52.54.244.2:8983/solr/gettingstarted/suggest\?suggest\=true\&suggest.build\=true\&suggest.dictionary\=mySuggester\&wt\=json\&suggest.q\=co
