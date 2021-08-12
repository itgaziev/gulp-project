# Готовая сборка Gulp для верстальщика
not support webp

## browser-sync
https://browsersync.io

Browser Sync - это отличное решение для LiveReload страниц при сохранении файлов. При чем релоад происходит не только в одном браузере, но и во всех браузерах сети, будь это мобильные устройства или другие компьютеры в одной Wi-Fi сети.

## del
https://www.npmjs.com/package/del

Данные плагин удалеят и очишает файлы, папки, в данной сборке используется для очистки сборки перед сборкой проекта

## gulp-autoprefixer
https://www.npmjs.com/package/gulp-autoprefixer

Для создание кроссплатфермоности css

## gulp-clean-css
https://www.npmjs.com/package/gulp-clean-css

Минификация css

## gulp-file-include
https://www.npmjs.com/package/gulp-file-include

Используется для шаблонизатора js/html 
Пример:

```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>
```
## gulp-fonter
https://www.npmjs.com/package/gulp-fonter

Конвертация шрифтов в нужный формат, в сборки используется для преобразование eot -> ttf

## gulp-group-css-media-queries
https://www.npmjs.com/package/gulp-group-css-media-queries

групирирует media и вставляет в конце файла css

## gulp-imagemin
https://www.npmjs.com/package/gulp-imagemin

Оптимизация изображения

## gulp-rename
https://www.npmjs.com/package/gulp-rename

Переименование файла

## gulp-sass
https://www.npmjs.com/package/gulp-sass

Перепроцессинг sass/scss

### sass
без данного плагина не работает gulp-sass

## gulp-svg-sprite
https://www.npmjs.com/package/gulp-svg-sprite

TODO: Разобраться подробнее

## gulp-ttf2woff и gulp-ttf2woff2
https://www.npmjs.com/package/gulp-ttf2woff2
https://www.npmjs.com/package/gulp-ttf2woff

Конвертирует шрифты в woff2 / woff

## gulp-uglify-es
https://www.npmjs.com/package/gulp-uglify-es

Минификация js
