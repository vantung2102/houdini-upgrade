# tooltip
css only tooltips using data attributes

[demo](http://www.yutakahoulette.com/data-tooltip)

the styles do not include any browser prefixes. to add them, run `autoprefixer` with `postcss`.

the styles do not include any z-index rules. you should add them to your own
project in relation to other z-indices:

```CSS
[class*=tooltip--]:before, 
[class*=tooltip--]:after {
  z-index: 10; 
}
```

to install: `npm install --save data-tooltip`

to use in css-land:

in your style sheet, just add `@import 'data-tooltip` and then run `postcss-import`

to use in markup-land: 
```HTML
<div class='tooltip--top' data-tooltip='this tooltip text will appear above this div when hovered over'>
  Hover over me
</div>
```
