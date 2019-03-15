var postcss = require('postcss')
var plugin = require('./')
var fs = require('fs')
var inputCss = fs.readFileSync('./example/input.css', 'utf8')
var outputCss = fs.readFileSync('./example/output.css', 'utf8')

var options = {
  viewportWidth: 750,
  viewportHeight: 1334,
  // Bottom line of transformation
  minPxValue: 2,
  viewportUnit: 'vmin',
  // Attributes that should not be converted
  ignoreProperty: ['border-radius']
}

function run (input, output, opts) {
  return postcss([plugin(opts)]).process(input).then(function (result) {
    expect(result.css).toEqual(output)
    expect(result.warnings()).toHaveLength(0)
  })
}

it('genertes px', function () {
  return run(inputCss, outputCss, options)
})
