eval $(cat ~/bellhop/samantha/web/tests/nightwatch/.env | sed 's/^/export /')
nightwatch -c tests/nightwatch/nightwatch.local.conf.js -f login.js -e chrome_1