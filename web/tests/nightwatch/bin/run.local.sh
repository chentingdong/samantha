dir=$(dirname $0)
echo $dir
eval $(cat $dir/../.env | sed 's/^/export /')
nightwatch -c tests/nightwatch/nightwatch.local.conf.js -f login.js -e chrome_1