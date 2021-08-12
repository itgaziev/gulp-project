const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter');

const fs = require('fs')

// const folder = {
//     project : require("path").basename(__dirname),
//     source : '_src'
// }

//Upper folder
const folder = {
    project : '../build',
    source: '../src'
}

const path = {
    build : {
        html : folder.project + '/',
        css : folder.project + '/assets/css/',
        js : folder.project + '/assets/js/',
        img : folder.project + '/assets/img/',
        fonts : folder.project + '/assets/fonts/'
    },
    src : {
        html : [folder.source + '/*.html', '!' + folder.source + '/_*.html'],
        css : folder.source + '/assets/scss/style.scss',
        js : folder.source + '/assets/js/script.js',
        img : folder.source + '/assets/img/**/*.{jpg,jpeg,png,svg,ico,webp}',
        fonts : folder.source + '/assets/fonts/*.ttf'
    },
    watch : {
        html : folder.source + '/**/*.html',
        css : folder.source + '/assets/scss/**/*.scss',
        js : folder.source + '/assets/js/**/*.js',
        img : folder.source + '/assets/img/**/*.{jpg,jpeg,png,svg,ico,webp}',
    },
    clean: './' + folder.project + '/'
}



const fonts = () => {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

const browserSync = (params) => {
    browsersync.init({
        server: {
            baseDir: path.clean
        },
        port: 3000,
        notify: false
    })
}

const html = () => {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

const js = () => {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js"}))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

const css = () => {
    return src(path.src.css)
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(group_media())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        //minify
        .pipe(clean_css())
        .pipe(rename({ extname: ".min.css"}))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

const images = () => {
    return src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 3,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

const wathcFiles = (params) => {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.img], images)
}

const clean = (params) => {
    return del(path.clean)
}




//fonts compile
const fontStyle = (params) => {
    let file_content = fs.readFileSync(folder.source + '/assets/scss/fonts.scss');
    if(file_content == ''){
        fs.writeFile(folder.source + '/assets/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, (err, items) => {
            if(items) {
                let c_fontname;
                for(var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if(c_fontname != fontname) {
                        fs.appendFile(folder.source + '/assets/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }

                    c_fontname = fontname;
                }
            }
        })
    }
}

const cb = () => {}


gulp.task('svgSprite', () => {
    return gulp.src([folder.source + '/assets/svg/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../assets/svg/icons.svg'
                }
            }
        }))
})

//TODO : not work (fix: node_modules/gulp-fonter/dist/index.js -> newFont.path = replace \\ -> /)
gulp.task('otf2ttf', () => {
    return gulp.src([folder.source + '/assets/fonts/*.otf'])
        .pipe(fonter({ formats: ['ttf'], hinting: false}))
        .pipe(dest(folder.source + '/assets/fonts/'))
})

let build = gulp.series(clean, gulp.parallel(css, js, html, images, fonts), fontStyle)
let watch = gulp.parallel(build, wathcFiles, browserSync)

exports.fontStyle = fontStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
