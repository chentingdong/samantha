exports.command = function (selector, value, using) {
  var self = this
  self.elements(using || "css selector", selector, function (elems) {
    elems.value.forEach(function (element) {
      for (var c of value.split("")) {
        self.elementIdValue(element.ELEMENT, c)
      }
    })
  })
  return this
}
