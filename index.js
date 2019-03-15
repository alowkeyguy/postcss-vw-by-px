var postcss = require('postcss')
var objectAssign = require('object-assign')

// !singlequotes|!doublequotes|!url()|pixelunit
var pxRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)px/ig
var defaults = {
  viewportWidth: 750,
  viewportHeight: 1334,
  // Bottom line of transformation
  minPxValue: 2,
  viewportUnit: 'vmin',
  // Attributes that should not be converted
  ignoreProperty: []
}

module.exports = postcss.plugin('postcss-vw-by-px', function (opts) {
  // Work with options here
  opts = objectAssign(defaults, opts)
  /* eslint-disable max-len */
  var pxToVw = createPxReplace(opts.viewportWidth, opts.minPxValue, opts.viewportUnit)
  var pxToVh = createPxReplace(opts.viewportHeight, opts.minPxValue, 'vh')
  var ignorePropertyRegex = createIgnorePropertyRegex(opts.ignoreProperty)

  return function (root) {
    // Transform CSS AST here
    root.walkRules(function (rule) {
      // Transform each rule here
      rule.walkDecls(function (decl) {
        if (ignorePropertyRegex && ignorePropertyRegex.test(decl.prop)) {
          return
        }

        var next = decl.next() || {}
        if (next.type === 'comment' && /^(vh|px|no)$/.test(next.text)) {
          if (next.text === 'vh') {
            decl.value = decl.value.replace(pxRegex, pxToVh)
          }
        } else {
          decl.value = decl.value.replace(pxRegex, pxToVw)
        }
      })
    })
  }
})

function createPxReplace (viewportSize, minPxValue, viewportUnit) {
  return function (m, $1) {
    if (!$1) return m
    var pixels = parseFloat($1)
    if (pixels <= minPxValue) return m
    return parseFloat((pixels / viewportSize * 100).toFixed(5)) + viewportUnit
  }
}
function createIgnorePropertyRegex (propertyArr) {
  if (propertyArr.length === 0) {
    return false
  }
  var prefixer = ['-webkit-', '-moz-', '-o-', '-ms-']
  /* eslint-disable */
  return new RegExp('^(' + prefixer.join('|') + ')?(' + propertyArr.join('|') + ')$')
}
