const fs = require("fs");

fs.readdirSync(__dirname).forEach(function (file) {
  if (file.indexOf(".js") > -1 && file != "index.js")
    module.exports[file.replace(".js", "")] = require("./" + file);
});
