nightwatch -c tests/nightwatch/nightwatch.conf.js -f login.js -e chrome_1

nightwatch -c tests/nightwatch/nightwatch.conf.js -f co-editing.js -e chrome_1,chrome_2
