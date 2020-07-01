dir=$(dirname $0)
mkdir -p $dir/logs
eval $(cat $dir/../.env | sed 's/^/export /')
nightwatch -c tests/nightwatch/nightwatch.conf.js -f login.js -e chrome_1
exit $?
