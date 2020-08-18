// assetsTransformer.ts
// For jest to recognizee svg, png for example.
import path from "path"

module.exports = {
  process(src, filename, config, options) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";"
  },
}
