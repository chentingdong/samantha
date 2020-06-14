eval $(cat tests/nightwatch/.env | sed 's/^/export /')
nightwatch -c tests/nightwatch/nightwatch.ci.conf.js -f login.js -e chrome_1