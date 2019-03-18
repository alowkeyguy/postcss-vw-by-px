# PostCSS Vw By Px [![Build Status][ci-img]][ci]

A plugin for [PostCSS] that generates viewport units (vw, vh, vmin, vmax) from pixel units. You can control the conversion by commenting`/* vh */` and `/* px */`

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/alowkeyguy/postcss-vw-by-px.svg
[ci]:      https://travis-ci.org/alowkeyguy/postcss-vw-by-px

## example
input
```css
.foo {
  border: 1px;
  width: 200px;
  height: 300px; /* vh */
  font-size: 16px; /* no */
  line-height: 30px; /* px */
}
```
output
```css
.foo {
  border: 1px;
  width: 26.66667vmin;
  height: 22.48876vh; /* vh */
  font-size: 16px; /* no */
  line-height: 30px; /* px */
}
```

## Options
Default
```js
{
  viewportWidth: 750,
  viewportHeight: 1334,
  minPxValue: 2,
  viewportUnit: 'vmin',
  ignoreProperty: []
}
```
* viewportWidth (Number) The width of the viewport.
* viewportHeight (Number) The height of the viewport.
* minPxValue (Number) The bottom line of transformation.
* viewportUnit (String) Expected units.
* ignoreProperty (Array) The propertys to ignore and leave as px.
  * example, you add border-radius, posscss-vw-by-px will leave -webkit-border-radius, -moz-border-radius, -o-border-radius as px

commonly, we don't hope to convert some attributes, such as `font-size`, add this property to ignoreProperty, all of font-size property will be ignored. also, i think some property  should be converted to `vh`, you can do this: 
```css
.foo {
  top: 30px; /* vh */
}
```

## Usage
`npm i -D postcss-vw-by-px`
```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-vw-by-px')({
      viewportWidth: 750,
      viewportHeight: 1334,
      minPxValue: 2,
      viewportUnit: 'vmin',
      ignoreProperty: []
    }),
    ...
  ]
}
```

See [PostCSS] docs for examples for your environment.

